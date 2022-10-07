const MINUS = document.getElementById("minimize")
const CLOSE_APP = document.getElementById("close-app")
const BACK = document.getElementById("back")

MINUS.addEventListener("click", minimize)
CLOSE_APP.addEventListener("click", close_app)
BACK.addEventListener("click", backMainPage)

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

/**
 * Fonction to load Stats Page
 * @function
 */
 function backMainPage(){
    window.location.href = "../../../index.html";
}