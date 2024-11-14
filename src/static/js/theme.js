import { getCookie } from "./cookie.js";

const toggleButton = document.querySelector("#toggle_theme")
const themeCss = document.querySelector("#theme_css")
const themePath = "../static/css/themes/"
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

switch (getCookie("theme")) {
    case "dark":
        setTheme("dark")
        break
    case "light":
        setTheme("light")
        break
    default:
        if (prefersDarkScheme.matches) { setTheme("dark") } else { setTheme("white") }
}

// Toggle Theme when button is clicked
toggleButton.addEventListener("click", () => {
    if (themeCss.getAttribute("href") === `${themePath}light.css`) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}) 

function setTheme(theme) {
    switch (theme) {
        case "dark":
            themeCss.href = `${themePath}dark.css`
            toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>'
            document.cookie = `theme=${theme};`
            break
        case "light":
            themeCss.href = `${themePath}light.css`
            toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>'
            document.cookie = `theme=${theme};`
            break
        default:
            document.cookie = `theme=;`
            alert("Invalid Theme, this is probaly a bug, open an issue in GitHub." + getCookie("theme"))
    }
}