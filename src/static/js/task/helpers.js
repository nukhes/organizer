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
    const time = task[3] || "";

    return `
        <li>
            <div>
                <input id="task_checkbox_${id}" type="checkbox" ${isChecked}>
                <h1>${task[1]}</h1>
            </div>
            <div class="task_right_container">
                <div id="task_delete_container_${id}">${deleteButton}</div>
                <span>${time}</span>
            </div>
        </li>
    `;
}

export function taskAddEventListener(taskId, checkBox, delButton) {
    const check = document.querySelector(`#task_checkbox_${taskId}`);
    const deleteContainer = document.querySelector(`#task_delete_container_${taskId}`);

    if (checkBox && check) {
        check.addEventListener("click", () => handleTaskToggle(taskId));
    }

    if (delButton && deleteContainer) {
        const deleteButton = deleteContainer.querySelector(`#task_delete_${taskId}`);
        if (deleteButton) {
            deleteButton.addEventListener("click", () => handleTaskDelete(taskId));
        }
    }
}

function handleTaskToggle(id) {
    const task = new Task(id);
    task.toggle(refreshTasks, id);
}

function handleTaskDelete(id) {
    const task = new Task(id);
    task.delete(refreshTasks, id);
}

export function handleTaskAdd(taskName = "Nova Tarefa") {
    const addTaskButton = document.querySelector("#add_task");
    if (addTaskButton) {
        addTaskButton.addEventListener("click", () => {
            const task = new Task();
            task.add(refreshTasks, taskName);
        });
    }
}
