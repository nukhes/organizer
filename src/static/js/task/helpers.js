import { Task } from "./Task.js";
import { refreshTasks } from "./tasks.js";

export function returnTaskComponent(task) { 
    const id = task[0];

    // Compare if the task was ticked
    const taskStatus = task[4] != 0

    // If status is true mark checkbox
    const isChecked = taskStatus ? "checked" : "";

    // If status is true create 
    const deleteButton = taskStatus
        ? `<i id="task_delete_${id}" class="delete fa-solid fa-trash" aria-label="Excluir tarefa"></i>`
        : "";
    const time = task[3] ? `<span>${task[3]}</span>` : "";

    return `
        <li class="smooth">
            <div>
                <input id="task_checkbox_${id}" type="checkbox" ${isChecked}>

                ${taskStatus ? `

                <h1 class="task_name_done">${task[1]}</h1>

                ` : `

                <input  class="task_name" id="task_name_${id}"type="text" placeholder="Task Name" value="${task[1]}">

                `}
                
            </div>
            <div class="task_right_container">
                <div id="task_delete_container_${id}">${deleteButton}</div>
                ${time}
            </div>
        </li>
    `;
}

export function taskAddEventListener(taskId, checkBox, delButton, input) {
    const check = document.querySelector(`#task_checkbox_${taskId}`);
    const deleteContainer = document.querySelector(`#task_delete_container_${taskId}`);

    if (checkBox && check) {
        check.addEventListener("click", () => handleTaskToggle(taskId));
    }

    if (delButton && deleteContainer) {
        const deleteButton = document.querySelector(`#task_delete_${taskId}`);
        if (deleteButton) {
            deleteButton.addEventListener("click", () => handleTaskDelete(taskId));
        }
    }

    if (input) {
        const taskNameInput = document.querySelector(`#task_name_${taskId}`);

        if (taskNameInput) {
            taskNameInput.addEventListener('blur', () => {
                handleTaskUpdate(taskId, (taskNameInput.value).trim());
            });
        }
    }
}


function handleTaskToggle(id) {
    const task = new Task(id);
    task.toggle(refreshTasks);
}

function handleTaskDelete(id) {
    const task = new Task(id);
    task.delete(refreshTasks);
}

function handleTaskUpdate(id, name) {
    const task = new Task(id);
    const fname = (name == "") ? "New Task" : name
    task.update(refreshTasks, fname);
}

export function handleTaskAdd(taskName = "New Task") {
    const addTaskButton = document.querySelector("#add_task");
    if (addTaskButton) {
        addTaskButton.addEventListener("click", () => {
            const task = new Task();
            task.add(refreshTasks, taskName);
        });
    }
}
