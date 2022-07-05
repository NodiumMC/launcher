use crate::checksum;
use futures_lite::stream::StreamExt;
use reqwest::get;
use std::cmp::min;
use std::path::Path;
use std::{fs::File, io::Write};
use tauri::{command, AppHandle, Manager};

#[derive(serde::Serialize, serde::Deserialize)]
pub struct DownloadableResource {
    url: String,
    local: String,
    sha1: String,
    size: u64,
}

#[derive(serde::Serialize, Clone)]
pub struct DownloadProgress {
    total: Option<u64>,
    progress: Option<u64>,
    error: Option<String>,
    done: Option<bool>,
}
#[command]
pub async fn download(app_handle: AppHandle, event: String, resource: DownloadableResource) {
    let emit = |progress: DownloadProgress| {
        app_handle.emit_all(&event.as_str(), progress).unwrap();
    };
    let error = |message: String| {
        emit(DownloadProgress {
            total: None,
            progress: None,
            error: Some(message),
            done: None,
        });
    };
    let DownloadableResource {
      url,
      local,
      sha1,
      size,
  } = resource;
  if Path::new(&local).exists() {
      let real_sha1 = checksum::For(&local).unwrap();
      if real_sha1 == sha1 {
          emit(DownloadProgress {
              total: Some(size),
              done: Some(true),
              progress: Some(size),
              error: None,
          });
          return;
      }
  }
  let res = get(url).await.unwrap();
  let total_size = size;
  let mut file = File::create(local).unwrap();
  let mut downloaded: u64 = 0;
  let mut stream = res.bytes_stream();
  while let Some(item) = stream.next().await {
      let chunk = item.unwrap();
      file.write_all(&chunk).unwrap();
      let new = min(downloaded + (chunk.len() as u64), total_size);
      downloaded = new;
      emit(DownloadProgress {
          total: Some(total_size),
          progress: Some(downloaded),
          error: None,
          done: None,
      });
  }
  emit(DownloadProgress {
      total: Some(total_size),
      progress: Some(total_size),
      error: None,
      done: Some(true),
  });
}
