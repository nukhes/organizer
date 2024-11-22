import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

path = "./database/organizer.db"

class Database:
    def get_id():
        pass
    
    def create(form):
        pass
            
class User(Database):
    def get_id(self, name):
        # Getting User ID
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM users WHERE username = ? LIMIT 1", (name,))
        user_data = cursor.fetchone()
        user_id = user_data[0] if user_data else -1
        connection.close()
        return user_id
    
    def create(self, form):
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        
        out = ""
        
        user_id = self.get_id(form["name"])
        
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
        if user_id != -1:
            out = "This username is already taken"
            
        if out == "":
            cursor.execute("INSERT INTO users(username, hash) VALUES (?, ?)", (form["name"], generate_password_hash(form["pass"])))
            connection.commit()
        return out
    
    def login(self, form):
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        
        out = ""
        
        try:
            user_id = self.get_id(form["name"])
            
            # Check if every value is assigned
            for value in form.values():
                if value == "":
                    out = "Fill the form correctly"
                    return out

            # If username is incorrect
            if user_id == -1:
                out = "This user doesn't exist"
            else:
                # If password is wrong
                cursor.execute("SELECT hash FROM users WHERE id = ? LIMIT 1", (user_id,))
                hash_query = cursor.fetchone()[0]
                
                ### DEBUG
                print(hash_query)
                print(form["pass"])
                print(f"status: {(check_password_hash(hash_query, form['pass']))}")
                ### DEBUG END
                
                
                if not check_password_hash(hash_query, form["pass"]):
                    out = "Your password is wrong"

                connection.close()
        except:
            out = "Server error"
            
        return True if not out else out
    
class Tasks:
    def get(self, id):
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        
        cursor.execute("SELECT id, name, details, date, status FROM tasks WHERE user_id = ?", (id,))
        tasks = cursor.fetchall()
        
        return tasks
    
    def toggle(self, task_id):
        connection = sqlite3.connect(path)
        cursor = connection.cursor()
        
        cursor.execute("SELECT status FROM tasks WHERE id = ?", (task_id,))
        res = cursor.fetchone()
        
        if res is None:
            print("task [{task_id}] not found")
            connection.close()
            return
        
        status = res[0]
        
        print(status)
        
        status = 0 if status == 1 else 1
            
        print(status)
        
        cursor.execute("UPDATE tasks SET status = ? WHERE id = ?", (status, task_id))
        connection.commit()
        connection.close()
        
        return True if status == 1 else False
    
    def delete(self, id):
        try:
            connection = sqlite3.connect(path)
            cursor = connection.cursor()
            cursor.execute("DELETE FROM tasks WHERE id = ?", (id,))
        except:
            return False
        return True