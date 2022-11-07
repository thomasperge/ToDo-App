import data from '../../data.json' assert { type: 'json' };

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

// === List all Task to do ===
// check if there are no task save
if(data.task.allTask.length == 0) {
    const div = document.createElement('div');
    div.className = 'noTaskText';
    div.innerHTML = 'No task recorded'
    document.getElementById("taskId").append(div);
} else {
    for(let pas = 0; pas <= data.task.allTask.length-1; pas++) {
        const div = document.createElement('div');
        div.className = 'taskSection';
        div.innerHTML = data.task.allTask[pas]

        // Change this if the task are important (check the data.json)
        if (data.task.allTask[pas] == "cook lasagna") {
            div.style.color = 'red'
            div.insertAdjacentText('afterbegin', '✨ ')
        } else {
            div.style.color = 'white'
        }

        document.getElementById("taskId").append(div);
    }
}

// === Current Task ===
const divCurrent = document.getElementById("currentTask")
divCurrent.innerHTML = `Current Task : ${data.task.allTask.length}`
