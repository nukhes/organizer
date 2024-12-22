from flask import Flask, render_template, request, flash, redirect, session, jsonify
from helpers import *

from models.Task import Task
from models.Habit import Habit
from models.User import User

app = Flask(__name__)
app.secret_key = "638eb4448251ca268a11cc831211ad07ecbbf3e109a0c15db2ce2202daeea4249314201fffdb0b3b3ef9df6fcebe3a3a1078311da1d5122df811a587278a99c99fe78adb16b09179f8fcc87e9da98cc0676350754ee7ce07f7f9ec5f08a40990"
[]
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
        flash("Account Created", "success")
        return redirect("/login")
    
    return render_template("register.html")


@app.route("/tasks", methods=["GET"])
@login_required
def tasks():
    return render_template("tasks.html", username=session["name"])

@app.route("/tasks/operations", methods=["POST"])
def tasks_operations():
    task = Task()
    
    # JSON from AJAX Client
    data = request.get_json()
    
    # Operation Type
    op = data.get("op")
    
    # Toggle Task "status key"
    if op == "toggle":
        task_id = data.get('taskId')
        res = task.toggle(task_id)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500
    
    if op == "delete":
        task_id = data.get('taskId')
        res = task.delete(task_id)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500
    
    if op == "get":
        task_id = data.get('taskId')
        return jsonify(task.get(session["id"], task_id)), 200
    
    if op == "add":
        name = data.get('name')
        res = task.add(session["id"], name)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500
    
    if op == "update":
        task_id = data.get('taskId')
        name = data.get('name')
        res = task.update(task_id, name)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500
        

@app.route("/habits")
@login_required
def habits():
    return render_template("habits.html", username=session["name"])

@app.route("/habits/operations", methods=["POST"])
def habits_operations():
    habit = Habit()
    
    # JSON from AJAX Client
    data = request.get_json()
    
    # Operation Type
    op = data.get("op")
    
    # Check habit
    if op == "check":
        habit_id = data.get('habitId')
        res = habit.check(habit_id)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500
    
    # Get habits
    if op == "get":
        habit_id = data.get('habitId')
        return jsonify(habit.get(session["id"], habit_id)), 200
    
    # Add habit
    if op == "add":
        name = data.get('name')
        if name == "":
            return jsonify({"error": "name is missing"}), 500
        res = habit.add(session["id"], name)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500
    
    # Update habit
    if op == "update":
        habit_id = data.get('habitId')
        name = data.get('name')
        res = habit.update(habit_id, name)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500
    
    # Delete habit
    if op == "delete":
        habit_id = data.get('habitId')
        res = habit.delete(habit_id)
        if res:
            return jsonify({"message": "success"}), 200
        return jsonify({"error": "server error"}), 500

@app.route("/pomodoro")
@login_required
def pomodoro():
    return render_template("pomodoro.html")

