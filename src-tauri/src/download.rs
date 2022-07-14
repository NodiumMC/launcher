use blake3::Hash;
use futures_util::future::Aborted;
use serde::{Serialize, Serializer};
use futures_util::{
    future::{AbortHandle, Abortable},
    StreamExt, TryStreamExt,
};
use reqwest::Url;
use std::path::Path;
use tauri::{AppHandle, Manager, Runtime};
use tokio::io::AsyncWriteExt;

/// Represents all possbible error that can happen when downloading
/// This uses the `thiserror` crate, it's fairly standard in the rust ecosystem.
#[derive(Debug, thiserror::Error)]
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
    #[error("File did not match expected checksum. Expected {expected}. Received {found}")]
    ChecksumVerification { expected: Hash, found: Hash },
}

// We have to manually implement `Serialize` for our error here.
// This allows us to control exactly how errors will be represented in the frontend.
// In this case we just send a string representation.
impl Serialize for DownloadError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where S: Serializer {
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
pub async fn download<R: Runtime>(
    app_handle: AppHandle<R>,
    url: Url,
    to: &Path,
    expected_checksum: String,
    progress_id: String,
) -> Result<String, DownloadError> {
    if &expected_checksum.len() > &0 && to.exists() && to.is_file() {
        match check_file_integrity(to, &expected_checksum) {
            Ok(_) => return Ok(expected_checksum),
            Err(DownloadError::ChecksumVerification { .. }) => {
                std::fs::remove_file(to)?;
            }
            Err(e) => return Err(e),
        }
    }

    let mut file = tokio::fs::File::create(to).await?;

    let res = reqwest::get(url).await?;
    // setup total_size and transferred variables for progress events
    let total_size = res.content_length().ok_or(DownloadError::NoContentLength)?;
    let mut transferred: u64 = 0;

    let mut stream = res.bytes_stream().map_err(DownloadError::from);

    while let Some(bytes) = stream.next().await {
        let bytes = bytes?;

        // write bytes to the file
        file.write(&bytes).await?;

        // calculate the new transferred amount of bytes
        transferred += bytes.len() as u64;

        // emit the progress event to the backend
        // we explicitly ignore the error here,
        // bc failing to emit one progress event is not a faliure condition for the download
        let _ = app_handle
            .emit_all(
                &progress_id,
                DownloadProgress {
                    total: total_size,
                    transferred,
                    chunk: bytes.len() as u64,
                },
            );
    }

    // check signature. But contrary to the first time we don't do any special handling we just remove the file on any error
    if  &expected_checksum.len() > &0 {
        if let Err(e) = check_file_integrity(to, &expected_checksum) {
            std::fs::remove_file(to)?;
            return Err(e);
        }
    }

    let hash = create_hash(to)?;
    let hex_hash = hash.to_hex();

    Ok(hex_hash[..].to_string())
}

fn check_file_integrity(file: &Path, expected_hash: &str) -> Result<(), DownloadError> {
    let expected_hash = blake3::Hash::from_hex(expected_hash)?;
    let found_hash = create_hash(file)?;

    if expected_hash == found_hash {
        Ok(())
    } else {
        Err(DownloadError::ChecksumVerification {
            expected: expected_hash,
            found: found_hash,
        })
    }
}

fn create_hash(file: &Path) -> Result<Hash, DownloadError> {
    let mut file = std::fs::File::open(file)?;
    let mut hasher = blake3::Hasher::new();
    std::io::copy(&mut file, &mut hasher)?;
    let found_hash = hasher.finalize();
    Ok(found_hash)
}

/// Just for fun I included an abortable version of the command
/// It reuses the implementation for `download` but wraps it in a way that discards the download
/// when an `abort_id` event is emitted from anywhere within the app
#[tauri::command]
pub async fn download_abortable<R: Runtime>(
    app_handle: AppHandle<R>,
    url: Url,
    to: &Path,
    hash: String,
    progress_id: String,
    abort_id: String,
) -> Result<String, DownloadError> {
    let (abort_handle, abort_registration) = AbortHandle::new_pair();

    // we reuse the above `download` command from but wrap it in an abortable future
    let future = Abortable::new(
        download(app_handle.clone(), url, to, hash, progress_id),
        abort_registration,
    );

    // listen for the frontend defined `abort_id` and abort the task
    app_handle.listen_global(abort_id, move |_| {
        abort_handle.abort();
    });

    future.await?
}
