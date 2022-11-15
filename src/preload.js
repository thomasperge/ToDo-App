const { ipcRenderer, contextBridge } = require('electron')
const data = require('./../data.json')

/**
 * Initialize API window
 */
const API = {
    window: {
        close: () => ipcRenderer.send("appMain/close"),
        minimize: () => ipcRenderer.send("appMain/minimize")
    },
}


/**
 * Create new window to add a Task
 * Event : Button "+" click => send path
 */
document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById("addTask")
    addButton?.addEventListener("click", () => {
        ipcRenderer.send("appMain/addTaskWindows")
    })
})


/**
 * Function check if categorie
 * @param {bool} categorie 
 * @returns bool
 */
function categorieButton(categorie){
    if(categorie) {
        return false
    } else {
        return true
    }
}


/**
 * Button commit the task (send the input text to ipcMain)
 * Event : Add Button click => send path
 * And Add categorie
 */
document.addEventListener('DOMContentLoaded', function() {
    // initialize send button :
    var addButtonSend = document.getElementById("addTaskButtonClick");

    // Initialize all button categorie :
    var personnalButton = document.getElementById("personal");
    var workButton = document.getElementById("work");
    var famillyButton = document.getElementById("family");
    var goalButton = document.getElementById("goal");
    var creationButton = document.getElementById("creation");
    var projectButton = document.getElementById("project");
    var entertainmentButton = document.getElementById("entertainment");
    var educationButton = document.getElementById("education");
    var travelButton = document.getElementById("travel");
    var eventButton = document.getElementById("event");
    var businessButton = document.getElementById("business");
    var hobbiesButton = document.getElementById("hobbies");
    var healthButton = document.getElementById("health");

    // Data request :
    var _myreq = {
        task: "",
        checked: false,
        personal: false,
        work: false,
        family: false,
        goal: false,
        creation: false,
        project: false,
        entertainment: false,
        education: false,
        travel: false,
        event: false,
        business: false,
        hobbies: false,
        health: false
    };

    personnalButton?.addEventListener("click", () => {
        _myreq.personal = categorieButton(_myreq.personal)
    });

    workButton?.addEventListener("click", () => {
        _myreq.work = categorieButton(_myreq.work)
    });

    famillyButton?.addEventListener("click", () => {
        _myreq.family = categorieButton(_myreq.family)
    });

    goalButton?.addEventListener("click", () => {
        _myreq.goal = categorieButton(_myreq.goal)
    });

    creationButton?.addEventListener("click", () => {
        _myreq.creation = categorieButton(_myreq.creation)
    });

    projectButton?.addEventListener("click", () => {
        _myreq.project = categorieButton(_myreq.project)
    });

    entertainmentButton?.addEventListener("click", () => {
        _myreq.entertainment = categorieButton(_myreq.entertainment)
    });

    educationButton?.addEventListener("click", () => {
        _myreq.education = categorieButton(_myreq.education)
    });

    travelButton?.addEventListener("click", () => {
        _myreq.travel = categorieButton(_myreq.travel)
    });

    eventButton?.addEventListener("click", () => {
        _myreq.event = categorieButton(_myreq.event)
    });

    businessButton?.addEventListener("click", () => {
        _myreq.business = categorieButton(_myreq.business)
    });

    hobbiesButton?.addEventListener("click", () => {
        _myreq.hobbies = categorieButton(_myreq.hobbies)
    });

    healthButton?.addEventListener("click", () => {
        _myreq.health = categorieButton(_myreq.health)
    });


    // Add Task click event :
    addButtonSend?.addEventListener("click", () => {
        // Initialize input + important checked :
        var input = document.getElementById("taskInputText").value;
        var cb = document.getElementById('important');

        // Add Input + checked important to our request :
        _myreq.task = input
        _myreq.checked = cb.checked

        // Send the request :
        ipcRenderer.send("appAdd/addTaskSend", (event, _myreq))
    });

})



/**
 * Button Delete and Finish a Task (main page index.html)
 * 2 Button : Delete and Finish => Check event => Send path
 */
document.addEventListener('DOMContentLoaded', function() {
    // == Loop into the DataBase ==
    for(let pas = 0; pas <= data.task.allTask.length-1; pas++) {

        // Initialize the different id existing according to the DB id :
        let deleteButton = document.getElementById("deleteButton" + data.task.allTask[pas].id.toString())
        let finishButton = document.getElementById("finishButton" + data.task.allTask[pas].id.toString())

        // Delete Button Event :
        deleteButton?.addEventListener("click", () => {

            var _myreq = {
                id: data.task.allTask[pas].id,
                task: data.task.allTask[pas].taskText,
                checked: data.task.allTask[pas].check
            };

            ipcRenderer.send("appMain/deleteTask", (event, _myreq))
        });

        // Finish Button Event :
        finishButton?.addEventListener("click", () => {

            var _myreq = {
                id: data.task.allTask[pas].id,
                task: data.task.allTask[pas].taskText,
                checked: data.task.allTask[pas].check
            };

            ipcRenderer.send("appMain/finishTask", (event, _myreq))
        })
    }
})

/**
 * Close and minimize Window add task / Window Login
 */
document.addEventListener('DOMContentLoaded', function() {
    let closeButtonAdd = document.getElementById("close-appAdd")
    let minButtonAdd = document.getElementById("minimizeAdd")

    let closeButtonLogin = document.getElementById("close-appLogin")
    let minButtonLogin = document.getElementById("minimizeLogin")

    // Close Button Add => Close window addTask
    closeButtonAdd?.addEventListener("click", () => {
        ipcRenderer.send("appAdd/closeAdd")
    })

    // Min Button Add => Minimize window addTask
    minButtonAdd?.addEventListener("click", () => {
        ipcRenderer.send("appAdd/minimizeAdd")
    })

    // Close Button Register => close window register 
    closeButtonLogin?.addEventListener("click", () => {
        ipcRenderer.send("appAdd/closeLogin")
    })

    // Min Button Register => Minimize window register
    minButtonLogin?.addEventListener("click", () => {
        ipcRenderer.send("appAdd/minimizeLogin")
    })
})


/**
 * Login a User with : Username and Profile Picture
 * Check the input: Username & Profile Picture
 * See if the 2 have been filled => return path with 2 parameter: Username & Pp
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the input :
    const fileSelector = document.getElementById('file');
    const usernameSelector = document.getElementById('input-username')
    const namePicture = document.getElementById("namePicture")
    const nameUsername = document.getElementById("nameUsername")

    // Initialize the register button:
    const registerButton = document.getElementById("register-button")

    // Initialize the image input bool :
    var imageDone = false
    var usernameDone = false
    var pathPicture

    // Check the event if there are any changes in the inputs :
    fileSelector?.addEventListener('change', (event) => {
        // Initilize the file filled :
        const fileList = event.target.files;

        // Check the file size :
        if(fileList[0].size <= 1820000) {
            namePicture.innerHTML = fileList[0].name
            pathPicture = fileList[0].path
            namePicture.style = "display: block;"
            imageDone = true
        } else {
            namePicture.innerHTML = "File too big, please take a new one..."
            namePicture.style = "display: block;"
        }
    });

    // Register Button :
    registerButton?.addEventListener('click', function() {
        // Check if the 2 input are filled :

        if(usernameSelector.value.length == 0) {
            nameUsername.innerHTML = "No username has been entered"
            nameUsername.style = "display: block;"
        } else if(usernameSelector.value.length <= 3) {
            nameUsername.innerHTML = "Username too short"
            nameUsername.style = "display: block;"
        } else if(usernameSelector.value.length >= 18) {
            nameUsername.innerHTML = "Username too long"
            nameUsername.style = "display: block;"
        } else {
            usernameDone = true
        }
        
        if(imageDone && usernameDone && usernameSelector.value.length >= 0) {

            var _myreq = {
                image: pathPicture,
                username: usernameSelector.value,
            };

            ipcRenderer.send("appMain/registerUser", (event, _myreq))
        }
    })
})

contextBridge.exposeInMainWorld("app", API)
