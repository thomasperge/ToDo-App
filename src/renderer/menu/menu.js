/**
 * Send IPC call to windows.close() and will also call app.close() after all process end.
 * @function
 */
function close_app() {
    ipcRenderer.send("close-btn", true)
}