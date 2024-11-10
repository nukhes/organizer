from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = "638eb4448251ca268a11cc831211ad07ecbbf3e109a0c15db2ce2202daeea4249314201fffdb0b3b3ef9df6fcebe3a3a1078311da1d5122df811a587278a99c99fe78adb16b09179f8fcc87e9da98cc0676350754ee7ce07f7f9ec5f08a40990"

@app.route("/")
def index():
    return render_template("tasks.html")

@app.route("/login")
def login():
    # TODO
    pass

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        form = {
            "name": request.form.get("name"),
            "pass": request.form.get("password"),
            "again": request.form.get("passwordconfirmation")
        }
        
        error = ""
        
        try:
            # Check if every value is assigned
            for value in form.values():
                if value == "":
                    error = "Fill the form correctly"
            
            # If passwords arent the same
            if form["pass"] != form["again"]:
                error = "Passwords must be equal"
                
            # If passwords are small
            elif len(form["pass"]) < 8:
                error = "Password length must be 8 characters"
            
        except:
            error = "Unknown Error"
        
        if error:
            flash(error)
            return redirect("/register")
        
        pass
        
    
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