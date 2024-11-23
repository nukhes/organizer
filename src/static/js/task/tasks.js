import { Task } from "./Task.js";
import { returnTaskComponent, taskAddEventListener } from './helpers.js'

const taskContainer = document.querySelector("#tasks_container")

export async function refreshTasks(id=-1) {
    // Default behavior: refresh all tasks
    let task = new Task()
    const data = await task.get(id)

    // Validate data
    if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data)
        return
    }

    // Clear the container before rendering
    taskContainer.innerHTML = ""

    // Create each task
    data.forEach(task => {
        taskContainer.innerHTML += returnTaskComponent(task)
    })

    // Add event listeners
    data.forEach(task => {
        const taskId = task[0]
        taskAddEventListener(taskId)
    })
}


refreshTasks()
