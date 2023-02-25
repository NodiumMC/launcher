#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;

use commands::compat::*;
use commands::process;

#[tokio::main]
async fn main() {
  tauri_plugin_deep_link::prepare("com.nodium.launcher");

  std::env::set_var("WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS", "--ignore-gpu-blocklist");
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .setup(|app| {
      let handle = app.handle();
      tauri_plugin_deep_link::register("ndml", move |request| {
        handle.emit_all("deeplink", request).unwrap();
      }).unwrap();
      Ok(())
    })
    .plugin(tauri_plugin_fs_watch::init())
    .invoke_handler(tauri::generate_handler![download::download, download::download_longtime, unzip::unzip, unzip::unzip_read_single, os::info, process::spawn])
    .run(context)
    .expect("error while running tauri application");
}
