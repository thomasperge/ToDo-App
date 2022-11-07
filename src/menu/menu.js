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
        // == Initialize Div ==
        const div = document.createElement('div');
        const deleteButtonArea = document.createElement('div')
        const buttonDelete = document.createElement('i')
        const finishButton = document.createElement('i')

        // == Initialize class for each div ==
        div.className = 'taskSection';
        deleteButtonArea.className = "deleteButtonArea"
        buttonDelete.className = "fa-regular fa-trash-can"
        finishButton.className = "fa-solid fa-check"

        // == Initialize id for each div ==
        buttonDelete.id = "deleteButton"
        finishButton.id = "finishButton"

        // == Log the main div ==
        console.log(div)

        // == Put the task text ==
        div.innerHTML = data.task.allTask[pas].taskText;

        // == Build the style div ==
        finishButton.style.color = '#12ff00'
        finishButton.style.marginRight = '15px'
        
        // Change this if the task are important (check the data.json)
        if (data.task.allTask[pas].check == true) {
            div.style.color = 'red'
            buttonDelete.style.color = 'white'
            div.insertAdjacentText('afterbegin', '✨ ')
        }

        // == Append the div to the main "div" ==
        div.appendChild(deleteButtonArea)
        deleteButtonArea.appendChild(finishButton)
        deleteButtonArea.appendChild(buttonDelete)

        document.getElementById("taskId").append(div);
    }
}

// === Current Task ===
const divCurrent = document.getElementById("currentTask")
divCurrent.innerHTML = `Current Task : ${data.task.allTask.length}`
