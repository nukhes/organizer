import { Habit } from "./Habit.js";
import { returnHabitComponent, habitAddEventListener, handleHabitAdd} from './helpers.js'

const habitContainer = document.querySelector("#habits_container")

handleHabitAdd()

export async function refreshHabits(id=-1) {
    // Default behavior: refresh all habit
    let habit = new Habit()
    const data = await habit.get(id)

    // Validate data
    if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data)
        return
    }

    // If user dont have tasks
    if (data.length == 0) {
        habitContainer.innerHTML = "<span id='new_tip'>Start by creating a new habit</span>"
        return
    }

    // Clear the container before rendering
    habitContainer.innerHTML = ""

    // Create each habit
    data.forEach(habit => {
        habitContainer.innerHTML += returnHabitComponent(habit)
    })
}


refreshHabits()
