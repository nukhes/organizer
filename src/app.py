from flask import Flask, render_template, request, flash, redirect
from model import *


app = Flask(__name__)
app.secret_key = "638eb4448251ca268a11cc831211ad07ecbbf3e109a0c15db2ce2202daeea4249314201fffdb0b3b3ef9df6fcebe3a3a1078311da1d5122df811a587278a99c99fe78adb16b09179f8fcc87e9da98cc0676350754ee7ce07f7f9ec5f08a40990"

@app.route("/")
def index():
    return render_template("tasks.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        form = {
            "name": request.form.get("name").strip(),
            "pass": request.form.get("password").strip(),
        }
        
        out = User.login(form)
        
        if out != True:
            flash(out)
            return redirect("/login")
        else: 
            flash("Logged In")
            return redirect("/")
        
    
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        form = {
            "name": request.form.get("name"),
            "pass": request.form.get("pass"),
            "again": request.form.get("again")
        }
        
        out = User.create(form)
        
        if out:
            flash(out)
        return redirect("/register")
    
    return render_template("register.html")


@app.route("/tasks")
def tasks():
    # TODO
    pass

@app.route("/habits")
def habits():
    # TODO
    pass

@app.route("/pomodoro")
def pomodoro():
    # TODO
    pass