use sysinfo::{System, SystemExt};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct OSInfo {
  total_mem: u64,
  free_mem: u64,
}

#[tauri::command]
pub fn info() -> OSInfo {
  let sys = System::new_all();
  OSInfo {
    total_mem: sys.total_memory(),
    free_mem: sys.available_memory()
  }
}
