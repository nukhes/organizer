import { Habit } from "./Habit.js";
import { refreshHabits } from "./habits.js";
import { Modal } from "../Modal.js";

export function returnHabitComponent(habit) {
    const data = {
        id: habit[0],
        name: habit[1],
        streak: habit[2],
        last_check: habit[3],
    };

    data.isDone = (data.last_check == getDate()) ? "Done" : "Not done";
    console.log(`DEBUG: DATALASTCHECK: ${data.last_check} / GETDATE: ${getDate()}`)

    data.doneClass = (data.isDone == "Done") ? "done" : "";

    return `
        <li class="${data.doneClass} smooth">
            <div>
                <h1 id="habit_title_${data.id}" class="habit_name">${data.name}</h1>
                <h2>Days: ${data.streak}</h2>
                <span>${data.isDone}</span>
            </div>
            <button id="habit_update_${data.id}">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </li>
    `;
}

function handleHabitMenu(id) {
    const modal = new Modal();
    modal.show(`
        <input id="habit_name" type="text" placeholder="Habit Name">
        <div class="buttons">
            <button id="update_habit">Update Habit</button>
            <button id="delete_habit" class="delete_button">Delete Habit</button>
        </div>
    `);

    const updateHabitButton = document.querySelector("#update_habit");
    const deleteHabitButton = document.querySelector("#delete_habit");

    updateHabitButton.addEventListener("click", () => {
        const habitName = document.querySelector("#habit_name").value.trim();

        if (!habitName) {
            alert("Missing name field");
            return;
        }

        const habit = new Habit(id);
        habit.update(refreshHabits, habitName);
        modal.hide();
    });

    deleteHabitButton.addEventListener("click", () => {
        const habit = new Habit(id);
        habit.delete(refreshHabits);
        modal.hide();
    });
}

function handleHabitCheck(title, id) {
    const habit = new Habit(id);
    habit.check(refreshHabits)
}

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function handleHabitAdd() {
    const openModalButton = document.querySelector("#open_modal");
    if (openModalButton) {
        openModalButton.addEventListener("click", () => {
            const modal = new Modal();
            modal.show(`
                <input id="habit_name" type="text" placeholder="Habit Name">
                <button id="add_habit">Add Habit</button>
            `);

            const addHabitButton = document.querySelector("#add_habit");
            addHabitButton.addEventListener("click", () => {
                const habitName = document.querySelector("#habit_name").value.trim();

                if (!habitName) {
                    alert("Missing name field");
                    return;
                }
                const habit = new Habit();
                habit.add(refreshHabits, habitName);
                modal.hide();
            });
        });
    }
}

export function habitAddEventListener(habitId, title=true, menu=true) {
    const menuButton = document.querySelector(`#habit_update_${habitId}`);
    const titleElement = document.querySelector(`#habit_title_${habitId}`);

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => handleHabitMenu(habitId));
    }

    if (titleElement && title) {
        titleElement.addEventListener("click", () => handleHabitCheck(titleElement, habitId));
    }

}

