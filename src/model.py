import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

path = "./database/organizer.db"

class Database:
    def create(form):
        pass
            
class User(Database):
    def create(form):
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        
        out = ""
        
        try:
            # Check if every value is assigned
            for value in form.values():
                if value == "":
                    out = "Fill the form correctly"
            
            # If passwords arent the same
            if form["pass"] != form["again"]:
                out = "Passwords must be equal"
                
            # If passwords are small
            elif len(form["pass"]) < 8:
                out = "Password length must be 8 characters"
        except:
            out = "Unknown Error"
            
        if not out:
            cursor.execute("INSERT INTO users(username, hash) VALUES (?, ?)", (form["name"], generate_password_hash(form["pass"])))
            connection.commit()
        return out
    
    def login(form):
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        
        out = ""
        
        try:
            # Check if every value is assigned
            for value in form.values():
                if value == "": 
                    out = "Fill the form correctly"

                # If passwords are small
                elif len(form["pass"]) < 8:
                    out = "Password length must be 8 characters"
        except:
            out = "Unknown Error"
            
        if not out:
            res = cursor.execute("SELECT username FROM users WHERE username = ?", (form["name"],))
            
            if not res:
                out = "This user doesnt exist"
            else:
                isright = cursor.execute("SELECT username, hash FROM users WHERE username = ? AND hash = ?", (form["name"], generate_password_hash(form["pass"])))
                if isright:
                    return True
        return out