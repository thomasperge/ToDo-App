import data from './../../data.json' assert { type: 'json' };

const MINUS_ADD = document.getElementById("minimize")
const CLOSE_APP_ADD = document.getElementById("close-app")

MINUS_ADD.addEventListener("click", minimize)
CLOSE_APP_ADD.addEventListener("click", close_app)


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

        // == Initialize id for each div => According to the id ==
        buttonDelete.id = "deleteButton" + data.task.allTask[pas].id.toString()
        finishButton.id = "finishButton" + data.task.allTask[pas].id.toString()

        // == Log the main div (know the class and id for button) ==
        console.log(div)

        // == Put the task text ==
        div.innerHTML = data.task.allTask[pas].taskText;

        // == Build the style div ==
        finishButton.style.color = '#12ff00'
        finishButton.style.marginRight = '15px'
        
        // Change this if the task are important (check the data.json)
        if (data.task.allTask[pas].check == true) {
            div.style.color = '#ff1212'
            buttonDelete.style.color = 'white'
        }

        // == Append the div to the main "div" ==
        div.appendChild(deleteButtonArea)
        deleteButtonArea.appendChild(finishButton)
        deleteButtonArea.appendChild(buttonDelete)

        document.getElementById("taskId").append(div);
    }
}

// === Current Task & Finish Task - Display ===
const divCurrent = document.getElementById("currentTaskNumber")
const divTotal = document.getElementById("finishTaskNumber")
divCurrent.innerHTML = `Current Task : ${data.task.allTask.length}`
divTotal.innerHTML = `Finish Task : ${data.task.totalFinishTask}`

const username = document.getElementById('profilename')
const picture = document.getElementById('profilePicture')
username.innerHTML = data.profile.name
picture.setAttribute('src', data.profile.assets)

console.log("=> Menu Page => Data : ", data)