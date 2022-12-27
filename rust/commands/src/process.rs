use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};
use tauri::{AppHandle, Runtime, Manager};
use std::thread;

#[tauri::command]
pub fn spawn<R: Runtime>(
    app_handle: AppHandle<R>,
    binary: String,
    args: Vec<String>,
    cwd: String,
    std: String,
    errevent: String,
    close: String,
) {
  thread::spawn(move || {
    let mut child = match Command::new(binary)
    .args(args)
    .current_dir(cwd)
    .stdout(Stdio::piped())
    .stderr(Stdio::piped())
    .spawn() {
        Ok(child) => child,
        Err(err) => {
          let _ = app_handle.emit_all(&errevent, err.to_string());
          return
        }
    };

    let stdout = child.stdout.as_mut().unwrap();

    let mut stdout_buf = BufReader::new(stdout);

    loop {
      let mut out = String::new();
      let _ = match stdout_buf.read_line(&mut out) {
        Err(err) => app_handle.emit_all(&errevent, err.to_string()),
        Ok(bytes) => {
          let result = app_handle.emit_all(&std, &out);
          if bytes == 0 && out.is_empty() {
            break;
          }
          result
        }
      };
    }

    let exit_status = child.wait().expect("failed to wait on child process");
    let _ = app_handle.emit_all(&close, exit_status.code().unwrap_or(-1));
  });
}
