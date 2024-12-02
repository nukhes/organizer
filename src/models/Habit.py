import sqlite3
import models.Model as Model

class Habit(Model.Database):
    def get(self, id, habit_id):
        connection = sqlite3.connect(self.path)
        cursor = connection.cursor()
        
        if habit_id:
            cursor.execute("SELECT name, streak FROM habits WHERE id = ? LIMIT 1", (3,))
            habit = cursor.fetchall()
        else:
            cursor.execute("SELECT id, name, streak FROM habits WHERE user_id = ?", (id,))
            habit = cursor.fetchall()
        return habit
    
    def add(self, user_id, name):
        connection = sqlite3.connect(self.path)
        cursor = connection.cursor()
        
        # Try to create a new task
        try:
            cursor.execute("BEGIN TRANSACTION;")
            cursor.execute("INSERT INTO habits (name, user_id, streak) VALUES (?, ?, 0)", (name, user_id))
            connection.commit()
            connection.close()
        except:
            print("ERROR: task named [{name}] cannot be created")
            connection.close()
            return False
        return True
    
    def toggle(self, task_id):
        connection = sqlite3.connect(self.path)
        cursor = connection.cursor()
        
        # Try to cat the actual state of an task
        try:
            cursor.execute("SELECT status FROM tasks WHERE id = ? LIMIT 1", (task_id,))
            res = cursor.fetchone()
        except:
            print("ERROR: task [{task_id}] not found")
            connection.close()
            return False
        
        # Set the next state based on actual
        status = 0 if res[0] == 1 else 1
        
        # Update status
        cursor.execute("BEGIN TRANSACTION;")
        cursor.execute("UPDATE tasks SET status = ? WHERE id = ?", (status, task_id))
        connection.commit()
        connection.close()
        return True
    
    def delete(self, id):
        try:
            connection = sqlite3.connect(self.path)
            cursor = connection.cursor()
            cursor.execute("BEGIN TRANSACTION;")
            cursor.execute("DELETE FROM tasks WHERE id = ?", (id,))
            connection.commit()
            connection.close()
        except:
            return False
        return True
    
    def update(self, task_id, name):
        connection = sqlite3.connect(self.path)
        cursor = connection.cursor()

        try:
            cursor.execute("BEGIN TRANSACTION;")
            cursor.execute("UPDATE tasks SET name = ? WHERE id = ?", (name, task_id))
            connection.commit()
            connection.close()
        except:
            return False
        return True