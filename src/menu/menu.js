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
// Check if there are no task save :
if(data.task.allTask.length == 0) {
    // Task Number = 0
    const div = document.createElement('div');
    div.className = 'noTaskText';
    div.innerHTML = 'No task recorded'
    document.getElementById("taskId").append(div);
} else {
    // == Loop into all task ==
    for(let pas = 0; pas <= data.task.allTask.length-1; pas++) {
        // == Initialize Div ==
        const div = document.createElement('div');
        const displayTaskText = document.createElement('div');
        const categorieButton = document.createElement('div');
        const displayCategorie = document.createElement('div');

        const deleteButtonArea = document.createElement('div');
        const buttonDelete = document.createElement('div');
        const finishButton = document.createElement('div');

        // == Initialize Bool for Categorie Boutton Emoji ==
        var categorieButtonBool = false

        // == Initialize class for each div ==
        div.className = 'taskSection';
        deleteButtonArea.className = "deleteButtonArea"
        buttonDelete.className = "fa-regular fa-trash-can"
        finishButton.className = "fa-solid fa-check"
        categorieButton.className = "categorieAreaButton fa-solid fa-angle-down"
        displayTaskText.className = "taskTextArea"
        displayCategorie.className = "displayCategorie"

        // == Initialize id for each div tasksection ==
        buttonDelete.id = "deleteButton" + data.task.allTask[pas].id.toString()
        finishButton.id = "finishButton" + data.task.allTask[pas].id.toString()

        // == Put the task text / Categorie Text ==
        displayTaskText.innerHTML = data.task.allTask[pas].taskText;
        displayCategorie.innerHTML = data.task.allTask[pas].categorie.toString()

        // == Build the style div ==
        finishButton.style.color = '#12ff00'

        // == Hidden the categorie display ==
        displayCategorie.style.display = "none"

        // == Change taskSection style if the task are important ("check" the data.json) ==
        if (data.task.allTask[pas].check == true) {
            div.style.color = '#ff1212'
            buttonDelete.style.color = 'white'
            categorieButton.style.color = "lightcoral"
        }

        // == Append all the div to the main "div" ==
        div.appendChild(categorieButton)
        div.appendChild(displayTaskText)
        div.appendChild(deleteButtonArea)
        // Put "categorieButton" first div to display before other
        div.prepend(categorieButton)
        
        deleteButtonArea.appendChild(finishButton)
        deleteButtonArea.appendChild(buttonDelete)

        // == Append all to front-end ==
        document.getElementById("taskId").append(div);

        // == Check data length ==
        if(data.task.allTask[pas].categorie.length >= 1) {
            document.getElementById("taskId").append(displayCategorie);
        }

        // === Categorie change icon Up and Down, When click event === 
        categorieButton?.addEventListener("click", () => {
            if(categorieButtonBool) {
                categorieButton.className = "categorieAreaButton fa-solid fa-angle-down"
                displayCategorie.style.display = "none"
                categorieButtonBool = false
            } else {
                categorieButton.className = "categorieAreaButton fa-solid fa-angle-up"
                categorieButtonBool = true
                displayCategorie.style.display = "flex"
            }
        })

        // == Log the main div (know the class and id for button) ==
        console.log(div)
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