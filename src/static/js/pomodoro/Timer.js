export class Timer {
    constructor (timerLabel, playButton, statusLabel, clock=1000) {
        this.timerLabel = timerLabel
        this.playButton = playButton
        this.statusLabel = statusLabel
        this.clock = clock
        this.state = false
        this.isBreak = false
        this.setTime(25) // Default Time
        setInterval(() => this.update(), this.clock)
    }

    update() {
        if (this.state) {
            let minutes = Number(this.time.slice(0, 2))
            let seconds = Number(this.time.slice(3))

            if (seconds > 0) { seconds -= 1 }
            else if (minutes >= 1) {
                minutes -= 1
                seconds = 59
            }

            this.setTime(minutes, seconds)
        }
    }
    
    toggle() {
        if (this.time != "00:00") {
            this.state = !this.state;

            let label = "Play"
            if (this.state) { label = "Stop" }

            this.playButton.innerHTML = label
        }
    }

    setTime(min=0, sec=0, isBreak=false) {

        const minutesF = String(min).padStart(2, '0')
        const secondsF = String(sec).padStart(2, '0')
        this.time = `${minutesF}:${secondsF}`
        this.timerLabel.innerHTML = this.time

        let status = "Relax, Grab a coffee"
        if (!isBreak) { status = "Work, Time to focus" }
        this.statusLabel.innerHTML = status.trim()

        if (min == 0 && sec == 0) {
            this.state = false
            this.playButton.style.visibility = "hidden"
            this.statusLabel.style.visibility = "hidden"
        }
    }
}