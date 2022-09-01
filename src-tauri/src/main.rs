#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

pub mod download;
pub mod unzip;

use tauri_plugin_fs_watch::Watcher;

#[tokio::main]
async fn main() {
  std::env::set_var("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", "--ignore-gpu-blocklist");
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .plugin(Watcher::default())
    .invoke_handler(tauri::generate_handler![download::download, download::download_abortable, unzip::unzip])
    .run(context)
    .expect("error while running tauri application");
}
