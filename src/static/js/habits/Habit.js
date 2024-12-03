export class Habit {
    constructor(id=-1) { 
        this.id = id
        this.api = "/habits/operations"
    }

    get(id=-1) {
        return fetch(this.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "get",
                habitId: id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            // console.log(data);
            return data;
        })
        .catch(error => {
            console.error(error);
            return null
        });
    }   

    check(refresh) {
        return fetch(this.api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "check",
                habitId: this.id
            })
        })
        .then(data => {
            // console.log(data);
            refresh(this.id)
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
                habitId: this.id
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
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
            // console.log(data);
            refresh()
        })
        .catch(error => {
            console.error(error);
        });
    }
}