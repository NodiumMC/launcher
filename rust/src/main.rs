#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_fs_watch::Watcher;

extern crate commands;

use commands::compat::*;

#[tokio::main]
async fn main() {
  std::env::set_var("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", "--ignore-gpu-blocklist");
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .plugin(Watcher::default())
    .invoke_handler(tauri::generate_handler![download::download, download::download_longtime, unzip::unzip, os::info])
    .run(context)
    .expect("error while running tauri application");
}
