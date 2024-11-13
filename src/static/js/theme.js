import { getCookie } from "./cookie";

const toggleButton = document.querySelector("#toggle_theme")
const themeCss = document.querySelector("#theme_css")
const themePath = "../static/css/themes/"

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (getCookie("theme") != "") {
    setTheme(getCookie("theme"));
} else if (prefersDarkScheme.matches) {
    setTheme("dark")
} else {
    setTheme("white")
}

// Toggle Theme when button is clicked
toggleButton.addEventListener("click", () => {
    if (themeCss.getAttribute("href") == `${themePath}light.css`) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}) 

function setTheme(theme) {
    document.cookie = `theme=${theme}`
    
    switch (theme) {
        case "dark":
            themeCss.href = `${themePath}dark.css`
            toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>'
            break
        case "white":
            themeCss.href = `${themePath}light.css`
            toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>'
            break
        default:
            document.cookie = `theme=`
            alert("Invalid Theme, this is probaly a bug, open an issue in GitHub.")
    }
}