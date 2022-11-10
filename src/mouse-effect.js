const icon = document.getElementById("animationMouse")

// == Test Cursor Effect ==
// document.onmousemove = function() {   (all screen cursor animation)

document.getElementById("animationMouse").onmousemove = function() {

    let x = event.clientX * 10 / window.innerWidth/2 + "%";
    let y = event.clientY * 10 / window.innerHeight/2 + "%";

    icon.style.left = x;
    icon.style.right = y;
    icon.style.transform = "translate(-" + x + ",-" + y + ")";
}
