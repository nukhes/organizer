import { Habit } from "./Habit.js";
import { refreshHabits } from "./habits.js";

export function returnHabitComponent(habit) {
    const data = {
        id: habit[0],
        name: habit[1],
        streak: habit[2],
        last_check: (habit[3] == getDate()) ? "today" : habit[3]
    }

    return `
        <li>
            <h1 class="habit_name">${data.name}</h1>
            <h2>Days: ${data.streak}</h2>
            ${
                (data.last_check == "today") ? "Done" : "Not done"
            }
        </li>
    `;
}

export function habitAddEventListener() {
    return
}

function handleHabitDelete(id) {
    const habit = new Habit(id);
    habit.delete(refreshHabits);
}

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function handleHabitAdd(habitName = "test") {
    const addHabitButton = document.querySelector("#add_habit");
    if (addHabitButton) {
        addHabitButton.addEventListener("click", () => {
            const habit = new Habit();
            habit.add(refreshHabits, habitName);
        });
    }
}
