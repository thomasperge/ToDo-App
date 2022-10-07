const STATICS = document.getElementById("statics")
STATICS.addEventListener("click", loadStatsPage)

/**
 * Fonction to load Stats Page
 * @function
 */
 function loadStatsPage(){
    window.location.href = "src/statistics/page/statistics.html";
}