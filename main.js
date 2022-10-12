// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
app.whenReady().then(main)

app.disableHardwareAcceleration()

let window

async function main() {
  // Create the browser window.
  window = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 840,
    height: 620,
    resizable: true,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  // window.webContents.openDevTools();

  window.on("ready-to-show", window.show)
  window.loadFile('index.html')
}

ipcMain.on("app/close", () => {
  app.quit();
})

ipcMain.on("app/minimize", () => {
  window.minimize();
})
