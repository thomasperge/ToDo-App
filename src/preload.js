const { ipcRenderer, contextBridge } = require('electron')

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
        ipcRenderer.send("appMain/addTaskSend", (event, input))
    })
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