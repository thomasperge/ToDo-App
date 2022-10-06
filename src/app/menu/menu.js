const MINUS = document.getElementById("minimize")
const CLOSE_APP = document.getElementById("close-app")

MINUS.addEventListener("click", minimize)
CLOSE_APP.addEventListener("click", close_app)

/**
 * Close App
 * @function
 */
function close_app(){
    app.window.close()
}

/**
 * Minimalize App
 * @function
 */
function minimize(){
    app.window.minimize()
}