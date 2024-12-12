export class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.innerHTML = '';
        this.modal.classList.add('modal');


        // Move modal in body
        document.body.appendChild(this.modal);

        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.classList.add('modal_overlay');
        this.overlay.onclick = () => this.hide();

        document.body.appendChild(this.overlay);
    }

    show(content) {
        this.modal.style.display = 'flex';
        this.overlay.style.display = 'flex';
        this.modal.innerHTML += content;
    }

    hide() {
        this.modal.style.display = 'none';
        this.overlay.style.display = 'none';
        this.modal.innerHTML = '';
    }
}