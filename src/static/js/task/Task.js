export class Task {
    constructor(id=-1) { 
        this.id = id
        this.api = "/tasks/operations"
    }

    get(id=-1) {
        return fetch(this.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "get",
                task_id: id
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

    toggle(refresh, id) {
        return fetch(this.api, {
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
            refresh(id)
        })
        .catch(error => {
            console.error(error);
        });
    }

    delete(refresh) {
        return fetch(this.api, {
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
            refresh()
        })
        .catch(error => {
            console.error(error);
        });
    }

    add(refresh, name) {
        return fetch(this.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "add",
                name: name
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            refresh()
        })
        .catch(error => {
            console.error(error);
        });
    }
}