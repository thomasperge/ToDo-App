const { ipcRenderer, contextBridge } = require('electron')

// Preload File est un fichier qui connecte le node backend et le frontend

const API = {
    window: {
        close: () => ipcRenderer.send("appMain/close"),
        minimize: () => ipcRenderer.send("appMain/minimize")
    },
}

// == Create New Window ==
document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById("addTask")
    addButton?.addEventListener("click", () => {
        ipcRenderer.send("appMain/addTaskWindows")
    })
})

// == Button => Reply the input text ==
document.addEventListener('DOMContentLoaded', function() {
    let addButtonSend = document.getElementById("addTaskButtonClick")
    addButtonSend?.addEventListener("click", () => {
        ipcRenderer.send("appMain/addTaskSend")
    })
})

// == Close and Minimize Windows2 ==
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