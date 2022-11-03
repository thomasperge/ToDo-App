import {fs} from 'fs';

const PLUS = document.getElementById("addTask")
PLUS.addEventListener("click", addTask)

/**
 * Add Task from Add task Button
 * @function
 */
function addTask() {
    var data = fs.readFileSync("../../data.json");
    var myObject = JSON.parse(data);
    console.log(myObject)
}
// https://www.youtube.com/watch?v=1rDvNDvZrnA