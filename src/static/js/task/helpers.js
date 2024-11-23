import { Task } from "./Task.js";
import { refreshTasks } from "./tasks.js"


// This function returns a HTML Element of an task based in a array called "task"
export function returnTaskComponent(task) { 
    let isChecked, deleteButton = ""
    let id = task[0]

    // If task is done
    if (task[4] != 0) {
        isChecked = "checked"
        deleteButton = `<i id="task_delete_${id}" class="delete fa-solid fa-trash"></i>`
    }

    // If there is no time for this task dont show nothing
    task[3] = (task[3] == null) ? "" : task[3]

    return `

    <li>
        <div>
            <input id="task_checkbox_${id}" type="checkbox"${isChecked}>
            <h1>${task[1]}</h1>
        </div>
        <div class="task_right_container">
            <div id="task_delete_container_${id}">${deleteButton}</div>
            <span>${task[3]}</span>
        </div>
    </li>

    `
}

// This function add I/O events to an especific task
export function taskAddEventListener(taskId) {
    // CHECKBOX
    const check = document.querySelector(`#task_checkbox_${taskId}`);
    const deleteContainer = document.querySelector(`#task_delete_container_${taskId}`);
    check.addEventListener("click", () => {
        handleTaskToggle(taskId);
    });

    // DELETE BUTTON
    if (check.checked) {
        deleteContainer.innerHTML = `<i id="task_delete_${taskId}" class="fa-solid fa-trash"></i>`;
        const deleteButton = document.querySelector(`#task_delete_${taskId}`);
        deleteButton.addEventListener("click", () => {
            handleTaskDelete(taskId);
        });
    } else {
        deleteContainer.innerHTML = "";
    }
}

function handleTaskToggle(id) {
    const task = new Task(id)
    task.toggle(refreshTasks, id)

}

function handleTaskDelete(id) {
    const task = new Task(id)
    task.delete(refreshTasks, id)
}
