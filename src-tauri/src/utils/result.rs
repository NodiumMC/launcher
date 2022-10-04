use thiserror::Error;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct JsonResult<T: Serialize, E: Error> {
  result: Option<T>,
  error: Option<E>
}

fn result<T: Serialize, E: Error>(r: Result<T, E>) -> JsonResult<T, E> {
  match r {
    Ok(result) => JsonResult { result },
    Err(error) => JsonResult { error }
  }
}
