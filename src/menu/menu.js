const MINUS = document.getElementById("minimize")
const CLOSE_APP = document.getElementById("close-app")
const STATICS = document.getElementById("statics")

MINUS.addEventListener("click", minimize)
CLOSE_APP.addEventListener("click", close_app)
STATICS.addEventListener("click", loadStatsPage)

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
 function loadStatsPage(){
    window.location.href = "src/statistics/page/statistics.html";
}