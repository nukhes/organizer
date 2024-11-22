import { Task } from "./Task.js";

const taskContainer = document.querySelector("#tasks_container")

function taskToggle(id) {
    const task = new Task(id)
    task.toggle(id)
}

function taskDelete(id) {
    const task = new Task(id)
    task.delete(id)
}


function refreshTasks() {
    let task = new Task();
    task.get().then(data => {
        if (!Array.isArray(data)) {
            console.error("Expected an array but got:", data);
            return;
        }

        // Create each task
        data.forEach(task => {
            taskContainer.innerHTML += taskComponent(task);
        });

        // Add a listener to every task inputs
        for (let i = 1; i <= data.length; i++) {
            // CHECKBOX
            document.querySelector(`#task_checkbox_${i}`).addEventListener("click", () => {
                taskToggle(i)
            })

            // DELETE BUTTON
            try {
                document.querySelector(`#task_delete_${i}`).addEventListener("click", () => {
                    taskDelete(i)
                })
            } catch {}
        }

    });
}

function taskComponent(taskDict) {
    
    let isChecked, deleteButton = ""
    let id = taskDict[0]

    // If task is done
    if (taskDict[4] != 0) {
        isChecked = "checked"
        deleteButton = `<i id="task_delete_${id}" class="fa-solid fa-trash"></i>`
    }

    const element = `
    <li>
        <div>
            <input id="task_checkbox_${id}" type="checkbox"${isChecked}>
            <h1>${taskDict[1]}</h1>
        </div>
        <div>
            ${deleteButton}
            <span>${taskDict[3]}</span>
        </div>
    </li>
    `

    return element;
}



refreshTasks()