const toggleButton = document.querySelector("#toggle_theme")
const themeCss = document.querySelector("#theme_css")
const themePath = "../static/css/themes/"

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");


if (prefersDarkScheme.matches) {
    setTheme("dark");
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
    if (theme == "dark") {
        themeCss.href = `${themePath}dark.css`
        toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>'
    } else if (theme == "light") {
        themeCss.href = `${themePath}light.css`
        toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>'
    } else {
        alert("Invalid Theme, this is probaly a bug, open an issue in GitHub.")
    }
}