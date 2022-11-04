const { ipcRenderer, contextBridge } = require('electron')

// Preload File est un fichier qui connecte le node backend et le frontend

const API = {
    window: {
        close: () => ipcRenderer.send("appMain/close"),
        minimize: () => ipcRenderer.send("appMain/minimize")
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById("addTask")
    addButton.addEventListener("click", () => {
        ipcRenderer.send("appMain/addTask")
    })
})

contextBridge.exposeInMainWorld("app", API)
