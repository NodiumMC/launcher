use reqwest::{Url, get, Error as RequestError};
use serde::{de::DeserializeOwned};
use thiserror::Error;
use serde_json::{Error as JsonError};

#[derive(Error, Debug)]
pub enum FetchError {
  #[error("Failed to fetch: {0}")]
  Request(#[from] RequestError),
  #[error("Failed to parse JSON: {0}")]
  Json(#[from] JsonError),
}

pub async fn fetch_json<T: DeserializeOwned>(url: &Url) -> Result<T, FetchError> {
  Ok(get(url.to_owned()).await?.json::<T>().await?)
}
