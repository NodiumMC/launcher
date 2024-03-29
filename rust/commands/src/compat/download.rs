use futures_util::{
  future::{AbortHandle, Abortable, Aborted},
  StreamExt, TryStreamExt,
};
use super::hash::{check_file_integrity, create_hash_for_file, BlakeHash, BlakeError};
use reqwest::Client;
use url::Url;
use serde::{Deserialize, Serialize, Serializer};
use std::{path::PathBuf};
use tauri::{command, AppHandle, Manager, Runtime};
use thiserror::Error;
use tokio::{fs as tfs, io::AsyncWriteExt};
use lazy_static::lazy_static;

lazy_static! {
  static ref CLIENT: Client = Client::new();
}

#[derive(Debug, Error)]
pub enum DownloadError {
  #[error(transparent)]
  Io(#[from] std::io::Error),
  #[error(transparent)]
  Net(#[from] reqwest::Error),
  #[error(transparent)]
  Hex(#[from] blake3::HexError),
  #[error(transparent)]
  Aborted(#[from] Aborted),
  #[error("Failed to get content length.")]
  NoContentLength,
  #[error(transparent)]
  HashMismatch(#[from] BlakeError),
}

impl Serialize for DownloadError {
  fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

#[derive(Debug, Deserialize)]
pub struct DownloadItem {
  url: Url,
  local: PathBuf,
  hash: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct DownloadProgress {
  total: u64,
  chunk: u64,
  transferred: u64,
}

fn check_match(expected: Option<String>, to: &PathBuf) -> Option<String> {
  if expected.is_some() && to.exists() && to.is_file() {
    let hash = expected.unwrap_or_default();
    return match check_file_integrity(to, &hash) {
      Ok(_) => Some(hash),
      Err(_) => None,
    };
  }
  None
}

fn emit_progress<R: Runtime>(apph: &AppHandle<R>, pid: &str, total: u64, chunk: u64, transferred: u64) {
  let _ = apph.emit_all(
    pid,
    DownloadProgress {
      total,
      transferred,
      chunk,
    },
  );
}

async fn download_file<F: Fn(u64, u64, u64)>(url: &Url, to: &PathBuf, on: Option<F>) -> Result<(), DownloadError> {
  let mut file = tfs::File::create(to).await?;
  let res = CLIENT
    .get(url.to_owned())
    .send()
    .await?;
  let total_size = res.content_length().ok_or(DownloadError::NoContentLength)?;
  let mut transferred: u64 = 0;
  let mut stream = res.bytes_stream().map_err(DownloadError::from);

  while let Some(bytes) = stream.next().await {
    let bytes = bytes?;
    file.write_all(&bytes).await?;
    transferred += bytes.len() as u64;
    if let Some(f) = &on {
      f(total_size, bytes.len() as u64, transferred);
    }
  }

  Ok(())
}

#[allow(unused)]
#[command]
pub async fn download<R: Runtime, 'a>(app_handle: AppHandle<R>, item: DownloadItem) -> Result<String, DownloadError> {
  tfs::create_dir_all(&item.local.parent().unwrap()).await?;
  if let Some(hash) = check_match(item.hash, &item.local) {
    return Ok(hash);
  }
  download_file(&item.url, &item.local, None::<fn(u64, u64, u64)>).await?;
  Ok(create_hash_for_file(&item.local)?.as_string())
}

#[allow(unused)]
#[command]
pub async fn download_longtime<R: Runtime>(
  app_handle: AppHandle<R>,
  pid: String,
  item: DownloadItem,
  aid: Option<String>,
) -> Result<String, DownloadError> {
  let (abort_handle, abort_registration) = AbortHandle::new_pair();

  let task = async {
    if let Some(hash) = check_match(item.hash, &item.local) {
      return Ok(hash);
    }
    download_file(
      &item.url,
      &item.local,
      Some(|a, b, c| emit_progress(&app_handle, &pid, a, b, c)),
    )
    .await?;
    Ok(create_hash_for_file(&item.local)?.as_string())
  };

  match aid {
    Some(id) => {
      let future = Abortable::new(task, abort_registration);
      app_handle.listen_global(id, move |_| abort_handle.abort());
      future.await?
    }
    None => task.await,
  }
}
