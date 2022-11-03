// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");
const data = require("./data.json")

app.whenReady().then(main);

app.disableHardwareAcceleration();

let window;

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
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./src/preload.js") // use a preload script
    }
  })

  // window.webContents.openDevTools();

  window.on("ready-to-show", window.show)
  window.loadFile('index.html')
};

ipcMain.on("app/close", () => {
  app.quit();
});

ipcMain.on("app/minimize", () => {
  window.minimize();
});

ipcMain.on("app/addTask", () => {

  function addTask(task) {    
    return new Promise((resolve, reject) => {

      data.task.allTask.push(task)

      fs.writeFile('data.json', JSON.stringify(data), (err) => {
        if (err) reject(err)
        resolve("File saved.")
      })
    });
  }
  
  addTask('thomas1')
  window.reload()
  
});
