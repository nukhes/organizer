from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("tasks.html")

@app.route("/login")
def login():
    # TODO
    pass

@app.route("/register")
def register():
    # TODO
    pass

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