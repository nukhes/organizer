from flask import Flask, render_template, request, flash, redirect, session, jsonify
from model import *
from helpers import *


app = Flask(__name__)
app.secret_key = "638eb4448251ca268a11cc831211ad07ecbbf3e109a0c15db2ce2202daeea4249314201fffdb0b3b3ef9df6fcebe3a3a1078311da1d5122df811a587278a99c99fe78adb16b09179f8fcc87e9da98cc0676350754ee7ce07f7f9ec5f08a40990"

@app.route("/")
@login_required
def index():
    return redirect("/tasks")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        form = {
            "name": request.form.get("name").strip(),
            "pass": request.form.get("password").strip(),
        }
        
        user = User()
        out = user.login(form)
        
        if out == True:
            flash("Logged In", "success")
            session["id"] = user.get_id(form["name"])
            session["name"] = form["name"]
            return redirect("/")
        
        flash(out, "error")
        return redirect("/login")

        
    
    if session.get("id") is None:
        return render_template("login.html")
    return redirect("/")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        form = {
            "name": request.form.get("name"),
            "pass": request.form.get("pass"),
            "again": request.form.get("again")
        }
        
        user = User()
        out = user.create(form)
        
        if out:
            flash(out, "error")
        return redirect("/register")
    
    return render_template("register.html")


@app.route("/tasks", methods=["GET"])
@login_required
def tasks():
    return render_template("tasks.html", username=session["name"])

@app.route("/tasks/operations", methods=["POST"])
def tasks_operations():
    task = Tasks()
    
    # JSON from AJAX Client
    data = request.get_json()
    
    # Operation Type
    op = data.get("op")
    
    # Toggle Task "status key"
    if op == "toggle":
        task_id = data.get('taskId')
        task.toggle(task_id)
    
    if op == "delete":
        task_id = data.get('taskId')
        task.delete(task_id)
    
    if op == "get":
        return jsonify(task.get(session["id"]))
        

@app.route("/habits")
@login_required
def habits():
    return render_template("habits.html")


@app.route("/pomodoro")
@login_required
def pomodoro():
    return render_template("pomodoro.html")

