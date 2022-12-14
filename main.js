// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");
var data = require("./data.json");


const createLoadingWindow = () => loading()

app.on('ready', () => {
    const windowLoading = createLoadingWindow()
    windowLoading.loadFile('loading.html')

    setTimeout(() => {
      windowLoading.close()
      // == Run the login Page or Main Page ==
      if (data.profile.profileDetect == false) {
        // == No login ==
        app.whenReady().then(login);
      } else {
        // == Login ==
        app.whenReady().then(main);
      }
    }, 3500)
})

app.disableHardwareAcceleration();


// Create the main windows
let windowLogin;
let window;
let window2;


/**
 * Loading Function - Loading Page (loading.html)
 * @function
 */
function loading() {
  // Create the browser window.
  windowLoad = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 500,
    height: 345,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./src/preload.js") // use a preload script
    }
  })
  return windowLoad
};



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
 * Add Task Function - Add Task Page (addTask.html)
 * @function
 */
async function addTask() {
  window2 = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 640,
    height: 420,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./src/preload.js") // use a preload script
    }
  });

  window2.on("ready-to-show", window2.show);
  window2.loadFile('addTask.html');
}



/**
 * Register Function - Register Page (register.html)
 * @function
 */
async function login() {
  windowLogin = new BrowserWindow({
    frame: false,
    autoHideMenuBar: true,
    width: 940,
    height: 620,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./src/preload.js"), // use a preload script
    }
  });

  windowLogin.on("ready-to-show", windowLogin.show);
  windowLogin.loadFile('register.html');
}



// ====== Close and Minimize App ======
// ==== Main Page ====
/**
 * Close Main App Page
 */
ipcMain.on("appMain/close", () => {
  app.quit();
  // Close Windows 2 if windows 2 are open :
  if (!window2?.isDestroyed() && window2?.isFocusable()) {
    window2.close()
  }
});

/**
 * Minimize Main App Page
 */
ipcMain.on("appMain/minimize", () => {
  window.minimize();
});


// ==== Add Task Page ====
/**
 * Close Add-Task Page
 */
 ipcMain.on("appAdd/closeAdd", () => {
  window2.close()
});

/**
 * Minimize Add-Task Page
 */
ipcMain.on("appAdd/minimizeAdd", () => {
  window2.minimize();
});


// ==== Register Page ====
/**
 * Close Login Page
 */
 ipcMain.on("appAdd/closeLogin", () => {
  windowLogin.close()
});

/**
 * Minimize Login Page
 */
ipcMain.on("appAdd/minimizeLogin", () => {
  windowLogin.minimize();
});




// ====== Add Task ======
/**
 * Add Task when button click
 * @method
 */
ipcMain.on("appAdd/addTaskSend", (event, _myreq) => {
  // Log (return array) :
  var allCategories = Object.entries(_myreq);

  // Initializ Task Id :
  var idTask

  // Check the all task length :
  if(data.task.allTask.length == 0) {
    idTask = 0
  } else {
    idTask = data.task.allTask[data.task.allTask.length-1].id + 1
  }

  // Create the new task :
  var newTask = {
    id: idTask,
    taskText: _myreq.task,
    check: _myreq.checked,
    categorie : []
  }

  // Push the category equal to true in the newTask variable :
  for(let i = 2; i < allCategories.length; i++){
    if(allCategories[i][1]){
      newTask.categorie.push(allCategories[i][0])
    };
  }

  /**
   * Add Task to newTask Object
   * @param {object} newTask 
   */
  function addTaskData(newTask) {
    data.task.allTask.push(newTask)

    fs.writeFile('data.json', JSON.stringify(data), (err) => {
      if (err) console.log(err)
    })
  }

  // Check length of input value
  if (_myreq.task.length > 0) {
    addTaskData(newTask)
  };

  console.log("Task Add : ", newTask);
  
  // Reload Window & Close window2:
  window.reload();
  window2.close();
});



/**
 * When button Click, create new windows to add task
 * @method
 */
ipcMain.on("appMain/addTaskWindows", () => {
  const isPlayerWindow2Opened = () => !window2?.isDestroyed() && window2?.isFocusable();
  // Check if windows2 is already open
  if (!isPlayerWindow2Opened()) {
    addTask()
  } else {
    console.log("can't open a new windows")
  }
});



/**
 * Function delete task from data.json
 * @function
 */
function deleteTask(idTask, finishTask) {
  // Delete Task :
  data.task.allTask = data.task.allTask.filter((el) => el.id != idTask);

  // Add +1 all task finished :
  if(finishTask) {
    data.task.totalFinishTask += 1
  }

  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) console.log(err)
  });
}



/**
 * Delete Task
 * @method
 */
ipcMain.on("appMain/deleteTask", (event, _myreq) => {
  // Log :
  console.log("Delete Task => ", _myreq.id)

  // Delete Task :
  deleteTask(_myreq.id, false)

  // Reload Window :
  window.reload();
});



/**
 * Finish Task
 * @method
 */
ipcMain.on("appMain/finishTask", (event, _myreq) => {
  // Log :
  console.log("Finish Task => id:", _myreq.id)

  // Delete Task :
  deleteTask(_myreq.id, true)

  // Reload Window :
  window.reload();
});



/**
 * Register New User
 * @method
 */
ipcMain.on("appMain/registerUser", (event, _myreq) => {

  console.log("Before Register => Data : ", data)

  data.profile.assets = _myreq.image
  data.profile.name = _myreq.username
  data.profile.profileDetect = true

  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('After Register => Data : ', data)
    }
  })

  windowLogin.close()
  main()
});
