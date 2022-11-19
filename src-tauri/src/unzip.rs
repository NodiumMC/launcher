use std::path::Path;
use tauri::{command, AppHandle, Manager};
use serde::{Serialize, Serializer};
use futures_util::future::Aborted;
use std::fs::File;
use tauri::Runtime;

#[derive(Debug, Clone, Serialize)]
struct UnzipProgress {
  total: Option<usize>,
  progress: Option<usize>,
}

#[derive(Debug, thiserror::Error)]
pub enum UnzipError {
  #[error(transparent)]
  Io(#[from] std::io::Error),
  #[error(transparent)]
  Aborted(#[from] Aborted),
  #[error(transparent)]
  Zip(#[from] zip::result::ZipError),
}

impl Serialize for UnzipError {
  fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

#[command]
pub async fn unzip<R: Runtime>(app_handle: AppHandle<R>, from: &Path, to: &Path, delete: bool, progress_id: String) -> Result<(), UnzipError> {
  let file = File::open(&from)?;
  let mut archive = zip::ZipArchive::new(&file)?;
  let archive_len = archive.len().clone();
  for i in 0..archive.len() {
    let mut file = archive.by_index(i)?;
    let path = to.join(file.mangled_name());
    if file.is_dir() {
      std::fs::create_dir_all(&path)?;
    } else {
      let mut dest = File::create(&path)?;
      std::io::copy(&mut file, &mut dest)?;
      let _ = app_handle.emit_all(&progress_id, UnzipProgress {
        total: Some(archive_len),
        progress: Some(i + 1),
      });
    }
  }
  if delete {
    std::fs::remove_file(from)?;
  }
  Ok(())
}
