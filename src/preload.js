const { ipcRenderer, contextBridge } = require('electron')
const data = require('./../data.json')
// import data from './../data.json' assert { type: 'json' };

const API = {
    window: {
        close: () => ipcRenderer.send("appMain/close"),
        minimize: () => ipcRenderer.send("appMain/minimize")
    },
}


// == Create New Window to add a Task ==
document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById("addTask")
    addButton?.addEventListener("click", () => {
        ipcRenderer.send("appMain/addTaskWindows")
    })
})


// == Button commit the task (send the input text to ipcMain) ==
document.addEventListener('DOMContentLoaded', function() {
    let addButtonSend = document.getElementById("addTaskButtonClick")

    addButtonSend?.addEventListener("click", () => {
        let input = document.getElementById("taskInputText").value
        const cb = document.getElementById('important');

        var _myreq = {
            task: input,
            checked: cb.checked
        };

        ipcRenderer.send("appMain/addTaskSend", (event, _myreq))
    })
})


// == Button Delete and Finish a Task (main page index.html) ==
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

// == Close and minimize windows2 ==
document.addEventListener('DOMContentLoaded', function() {
    let closeButtonAdd = document.getElementById("close-appAdd")
    let minButtonAdd = document.getElementById("minimizeAdd")

    closeButtonAdd?.addEventListener("click", () => {
        ipcRenderer.send("appAdd/close")
    })

    minButtonAdd?.addEventListener("click", () => {
        ipcRenderer.send("appAdd/minimize")
    })
})

contextBridge.exposeInMainWorld("app", API)