use futures_util::future::Aborted;
use futures_util::{
  future::{AbortHandle, Abortable},
  StreamExt, TryStreamExt,
};
use reqwest::Url;
use serde::{Serialize, Serializer};
use std::path::Path;
use std::time::Duration;
use tauri::{AppHandle, Manager, Runtime};
use thiserror::Error;
use tokio::io::AsyncWriteExt;

use self::hash::{BlakeHash};
mod hash;

/// Represents all possbible error that can happen when downloading
/// This uses the `thiserror` crate, it's fairly standard in the rust ecosystem.
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
  HashMismatch(#[from] hash::BlakeError),
}

impl Serialize for DownloadError {
  fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

/// Simplify the event payload bc completed and error cases are handled by the command function return value
#[derive(Debug, Clone, Serialize)]
struct DownloadProgress {
  total: u64,
  transferred: u64,
  chunk: u64,
}

/// Downloads a given `url` to a given path (`to`) on disk with blake3 integrity checking.
/// Checks the disk beforehand to avoid unnecessary network requests.
/// The parameters of this command are explicitly typed and provide input validation
/// (`Url` and `Path` can both parse string inputs from the frontend and assert the inputs are well-formed)
#[tauri::command]
pub async fn download_file<R: Runtime>(
  app_handle: AppHandle<R>,
  url: Url,
  to: &Path,
  expected_checksum: Option<String>,
  progress_id: String,
) -> Result<String, DownloadError> {
  if !expected_checksum.is_none() && to.exists() && to.is_file() {
    let hash = expected_checksum.unwrap_or_default();
    match hash::check_file_integrity(to, &hash) {
      Ok(_) => return Ok(hash),
      Err(_) => {},
    }
  }

  let mut file = tokio::fs::File::create(to).await?;
  let res = reqwest::Client::builder()
    .timeout(Duration::from_secs(5))
    .build()?
    .get(url)
    .send()
    .await?;
  let total_size = res.content_length().ok_or(DownloadError::NoContentLength)?;
  let long_time = total_size > 1024 * 1024 * 2;
  let mut transferred: u64 = 0;
  let mut stream = res.bytes_stream().map_err(DownloadError::from);

  while let Some(bytes) = stream.next().await {
    let bytes = bytes?;
    file.write(&bytes).await?;
    transferred += bytes.len() as u64;

    if !long_time {
      continue;
    }

    let _ = app_handle.emit_all(
      &progress_id,
      DownloadProgress {
        total: total_size,
        transferred,
        chunk: bytes.len() as u64,
      },
    );
  }

  let _ = app_handle.emit_all(
    &progress_id,
    DownloadProgress {
      total: total_size,
      transferred,
      chunk: if !long_time { transferred } else { 0 },
    },
  );

  Ok(hash::create_hash_for_file(&to)?.as_string())
}

#[tauri::command]
pub async fn download<R: Runtime>(
  app_handle: AppHandle<R>,
  url: Url,
  to: &Path,
  hash: Option<String>,
  progress_id: String,
  abort_id: Option<String>,
) -> Result<String, DownloadError> {
  let (abort_handle, abort_registration) = AbortHandle::new_pair();

  let task = download_file(app_handle.clone(), url, to, hash, progress_id);

  match abort_id {
    Some(id) => {
      let future = Abortable::new(
        task,
        abort_registration,
      );

      app_handle.listen_global(id, move |_| {
        abort_handle.abort();
      });

      future.await?
    },
    None => task.await
  }
}
