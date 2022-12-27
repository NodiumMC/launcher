use std::path::Path;
use tauri::{command, AppHandle, Manager};
use serde::{Serialize, Serializer};
use futures_util::future::Aborted;
use std::fs::{self, File};
use std::io;
use tauri::Runtime;
use tar::Archive;
use flate2::read::GzDecoder;

enum ArchiveType {
  Zip,
  Tarball,
  Unknown,
}

impl From<&Path> for ArchiveType {
  fn from(value: &Path) -> Self {
    if let Some(extension) = value.extension() {
      match extension.to_str() {
        Some(ext) => match ext {
          "zip" => ArchiveType::Zip,
          "gz" => ArchiveType::Tarball,
          _ => ArchiveType::Unknown,
        },
        None => ArchiveType::Unknown,
      }
    } else {
      ArchiveType::Unknown
    }
  }
}

#[derive(Debug, Clone, Serialize)]
struct UnzipProgress {
  total: Option<usize>,
  progress: Option<usize>,
}

#[derive(Debug, thiserror::Error)]
pub enum UnzipError {
  #[error(transparent)]
  Io(#[from] io::Error),
  #[error(transparent)]
  Aborted(#[from] Aborted),
  #[error(transparent)]
  Zip(#[from] zip::result::ZipError),
  #[error("Unknown archive format")]
  UnknownFormat
}

impl Serialize for UnzipError {
  fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

#[command]
pub async fn unzip<R: Runtime>(app_handle: AppHandle<R>, from: &Path, to: &Path, delete: bool, progress_id: String) -> Result<(), UnzipError> {
  let archive_type: ArchiveType = from.into();
  let file = File::open(from)?;
  match archive_type {
    ArchiveType::Zip => {
      let mut archive = zip::ZipArchive::new(&file)?;
      let archive_len = archive.len();
      for i in 0..archive.len() {
        let mut file = archive.by_index(i)?;
        let path = to.join(file.mangled_name());
        if file.is_dir() {
          fs::create_dir_all(&path)?;
        } else {
          let mut dest = File::create(&path)?;
          io::copy(&mut file, &mut dest)?;
          let _ = app_handle.emit_all(&progress_id, UnzipProgress {
            total: Some(archive_len),
            progress: Some(i + 1),
          });
        }
      }
    },
    ArchiveType::Tarball => {
      let decoder = GzDecoder::new(&file);
      let mut archive = Archive::new(decoder);
      let files = archive.entries()?.collect::<Vec<_>>();
      let len = files.len();
      for (i, file) in files.into_iter().enumerate() {
        let mut file = file?;
        let path = to.join(file.path()?);
        if let Some(p) = path.parent() {
          fs::create_dir_all(p)?;
        }
        file.unpack(&path)?;
        let _ = app_handle.emit_all(&progress_id, UnzipProgress {
          total: Some(len),
          progress: Some(i),
        });
      }
    },
    ArchiveType::Unknown => return Err(UnzipError::UnknownFormat)
  };
  if delete {
    let _ = fs::remove_file(from);
  }
  Ok(())
}
