export class Task {
    constructor(id=-1) { 
        this.id = id
        this.api = "/tasks/operations"
    }

    get() {
        return fetch(this.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "get",
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error(error);
            return null
        });
    }   

    toggle() {
        fetch(this.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "toggle",
                taskId: this.id
            })
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    delete() {
        fetch(this.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "delete",
                taskId: this.id
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
}