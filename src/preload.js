const { ipcRenderer, contextBridge } = require('electron')

// Preload File est un fichier qui connecte le node backend et le frontend

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize")
    }
}


document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById("addTask")
    addButton.addEventListener("click", () => {
        ipcRenderer.send("app/addTask")
    })
})

contextBridge.exposeInMainWorld("app", API)
