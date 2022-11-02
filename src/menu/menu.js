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


import data from '../../data.json' assert { type: 'json' };

for(let pas = 0; pas <= data.task.allTask.length-1; pas++) {
    console.log(data.task.allTask[pas])
    const div = document.createElement('div');
    div.className = 'taskSection';
    div.innerHTML = data.task.allTask[pas]
    document.getElementById("taskId").append(div);

}
