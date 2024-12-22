import { Timer } from "./Timer.js"

const pomodoro = {
    timerLabel: document.querySelector("#pomodoro_timer"),
    playButton: document.querySelector("#pomodoro_action"),
    statusLabel: document.querySelector("#pomodoro_status"),
    notificationElement: document.getElementById('notification-sound')
}
let timer = new Timer(pomodoro)

// Setup duration timer modifiers
const pomodoroModifiers = document.querySelector("#pomodoro_modifiers").childNodes
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
pomodoro.playButton.addEventListener("click", () => {
    timer.toggle()
    console.log(`timerState: ${timer.state}`)
})