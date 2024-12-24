import { Modal } from "./Modal.js";

const profileModal = document.querySelector("#profile-modal")

profileModal.addEventListener("click", () => {
    console.log("Profile Modal")
    const modal = new Modal();
    modal.show(`
        <div style="
        display: flex;
        flex-direction: column;
        gap: .5rem;
        align-items: center;
        justify-content: center;
        width: 10rem;
        ">
            <h1>Profile</h1>
            <button id="profile" style="width: 10rem;">My Profile</button>
            <button id="logout" class="delete_button" style="width: 10rem;">Logout</button>
        </div>
    `);
    const profileButton = document.querySelector("#profile")
    const logoutButton = document.querySelector("#logout")
    profileButton.addEventListener("click", () => { profilePage() })
    logoutButton.addEventListener("click", () => { logout() })
})

function profilePage() {
    fetch('/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(() => {
        window.location.href = '/profile';
    })
    .catch(error => {
        console.error(error);
    });
}

function logout() {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(() => {
        window.location.href = '/login';
    })
    .catch(error => {
        console.error(error);
    });
}
