// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");
const data = require("./data.json")

app.whenReady().then(main);

app.disableHardwareAcceleration();

// Create the main windows
let window;
let window2

/**
 * Main Function - Index Page (index.html)
 * @function
 */
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


/**
 * Close Main App Page
 */
ipcMain.on("appMain/close", () => {
  app.quit();
});

/**
 * Minimize Main App Page
 */
ipcMain.on("appMain/minimize", () => {
  window.minimize();
});

/**
 * Close Add-Task Page
 */
 ipcMain.on("appAdd/close", () => {
  window2.close()
});

/**
 * Minimize Add-Task Page
 */
ipcMain.on("appAdd/minimize", () => {
  window2.minimize();
});



/**
 * Add Task when button click
 */
// ipcMain.on("appMain/addTask2", () => {
//   function addTask(task) {    
//     return new Promise((resolve, reject) => {
//       data.task.allTask.push(task)

//       fs.writeFile('data.json', JSON.stringify(data), (err) => {
//         if (err) reject(err)
//         resolve("File saved.")
//       })
//     });
//   }

//   addTask('thomas1')
//   console.log(data.task.allTask)
//   window.reload()
// });


/**
 * When button Click, create new windows to add task
 */
ipcMain.on("appMain/addTask", () => {
  const isPlayerWindowOpened = () => !window2?.isDestroyed() && window2?.isFocusable();

  // Check if windows2 is already open
  if (!isPlayerWindowOpened()) {
    // create the browser window
    window2 = new BrowserWindow({
      frame: false,
      // autoHideMenuBar: true,
      width: 640,
      height: 420,
      // resizable: false,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join(__dirname, "./src/preload.js") // use a preload script
      }
    });

    window2.on("ready-to-show", window2.show);
    window2.loadFile('addTask.html');
  } else {
    console.log("can't open a new windows")
  }
});
