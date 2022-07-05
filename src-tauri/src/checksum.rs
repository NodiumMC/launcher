use sha1::{Sha1, Digest};
use std::{fs::File, io::copy};

pub fn For(path: &String) -> Result<String, String> {
  let mut file = File::open(&path).or(Err(String::from(""))).unwrap();
  let mut hasher = Sha1::default();
  copy(&mut file, &mut hasher);
  let digest = hasher.finalize();
  Ok(format!("{:x}", digest))
}