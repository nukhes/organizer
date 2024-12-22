import { Timer } from "./Timer.js"

const statusLabel = document.querySelector("#pomodoro_status")
const timerLabel = document.querySelector("#pomodoro_timer")
const playButton = document.querySelector("#pomodoro_action")
const pomodoroModifiers = document.querySelector("#pomodoro_modifiers").childNodes

let timer = new Timer(timerLabel, playButton, statusLabel, 1)

// Setup duration timer modifiers
pomodoroModifiers.forEach((modifier) => {
    modifier.addEventListener("click", () => {
        let isBreak = true
        if (!timer.state) {
            if (modifier.hasAttribute("work")) { isBreak = false }
            timer.setTime(modifier.getAttribute("min"), 0, isBreak)
            timer.playButton.style.visibility = "visible"
            timer.statusLabel.style.visibility = "visible"
        }
    })
})

// Play/Stop Button
playButton.addEventListener("click", () => {
    timer.toggle()
    console.log(`timerState: ${timer.state}`)
})