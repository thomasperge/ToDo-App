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
    addButton.addEventListener("click", () => {
        ipcRenderer.send("appMain/addTask")
    })
})

// == Close and Minimize Windows2 ==
document.addEventListener('DOMContentLoaded', function() {
    let closeButtonAdd = document.getElementById("close-appAdd")
    let minButtonAdd = document.getElementById("minimizeAdd")

    closeButtonAdd.addEventListener("click", () => {
        ipcRenderer.send("appAdd/close")
    })

    minButtonAdd.addEventListener("click", () => {
        ipcRenderer.send("appAdd/minimize")
    })
})

contextBridge.exposeInMainWorld("app", API)