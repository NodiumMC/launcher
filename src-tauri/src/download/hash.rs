use arrayvec::ArrayString;
use blake3::{Hash, HexError};
use std::path::Path;
use thiserror::Error;

pub trait BlakeHash {
  fn as_string(&self) -> String;
  fn as_hex(&self) -> ArrayString<64_usize>;
}

impl BlakeHash for Hash {
  fn as_string(&self) -> String {
    self.as_hex()[..].to_string()
  }

  fn as_hex(&self) -> ArrayString<64_usize> {
    self.to_hex()
  }
}

#[derive(Debug, Error)]
pub enum BlakeError {
  #[error(transparent)]
  Io(#[from] std::io::Error),
  #[error(transparent)]
  Hex(#[from] HexError),
  #[error("Hash mismatched. Expected: {expected}. Received: ${found}")]
  HashMismatch { expected: String, found: String },
}

pub fn create_hash_for_file(path: &Path) -> Result<Hash, BlakeError> {
  let mut file = std::fs::File::open(path)?;
  let mut hasher = blake3::Hasher::new();
  std::io::copy(&mut file, &mut hasher)?;
  let found_hash = hasher.finalize();
  Ok(found_hash)
}

pub fn check_file_integrity(path: &Path, expected: &str) -> Result<(), BlakeError> {
  let found = create_hash_for_file(path)?.as_string();
  if expected == found {
    Ok(())
  } else {
    Err(BlakeError::HashMismatch { expected: expected.to_string(), found: found.to_string() })
  }
}
