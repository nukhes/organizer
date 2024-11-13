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
                    return out
            
            # If passwords arent the same
            if form["pass"] != form["again"]:
                out = "Passwords must be equal"
                
            # If passwords are small
            if len(form["pass"]) < 8:
                out = "Password length must be 8 characters"
            
            # If there are some user with this username
            if cursor.execute("SELECT username FROM users WHERE username = ?", (form["name"],)) != "":
                out = "This username is already taken"
        except:
            out = "Server Error"
            
        if out == "":
            cursor.execute("INSERT INTO users(username, hash) VALUES (?, ?)", (form["name"], generate_password_hash(form["pass"])))
            connection.commit()
        return out
    
    def login(form):
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        
        out = ""
        
        try:
            cursor.execute("SELECT id FROM users WHERE username = ?", (form["name"],))
            user_id = cursor.fetchone()[0] if not cursor.fetchone()[0] is None else -1
            
            # Check if every value is assigned
            for value in form.values():
                if value == "": 
                    out = "Fill the form correctly"
                    return out

            # If username is incorrect
            if user_id == -1:
                out = "This user doesnt exists"
            
            # If password is wrong
            cursor.execute("SELECT hash FROM users WHERE id = ?", (user_id,))
            hash_query = cursor.fetchone()[0]
            if check_password_hash(hash_query, form["pass"]):
                out = "Your password is wrong"
        except:
            out = "Server Error"
            
        if not out:
            cursor.execute("SELECT username, hash FROM users WHERE id = ? AND hash = ?", (user_id, generate_password_hash(form["pass"])))
            user_authenticated = cursor.fetchone()
            if user_authenticated:
                return True
            
        return out