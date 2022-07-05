#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

pub mod download;
pub mod checksum;

#[tokio::main]
async fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![download::download])
    .run(context)
    .expect("error while running tauri application");
}
