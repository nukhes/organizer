import sqlite3
import helpers
import models.Model as Model

class Habit(Model.Database):
    def get(self, id, habit_id):
        connection = sqlite3.connect(self.path)
        cursor = connection.cursor()
        
        cursor.execute("SELECT id, name, streak, last_check FROM habits WHERE user_id = ?", (id,))
        habit = cursor.fetchall()
        
        return habit
    
    def add(self, user_id, name):
        connection = sqlite3.connect(self.path)
        cursor = connection.cursor()
        
        # Try to create a new habit
        try:
            cursor.execute("BEGIN TRANSACTION;")
            cursor.execute("INSERT INTO habits (name, user_id) VALUES (?, ?)", (name, user_id))
            connection.commit()
            connection.close()
        except:
            print("ERROR: habit named [{name}] cannot be created")
            connection.close()
            return False
        return True
    
    def check(self, habit_id):
        connection = sqlite3.connect(self.path)
        cursor = connection.cursor()

        check_date = helpers.get_date()
        
        cursor.execute("BEGIN TRANSACTION;")
        cursor.execute("UPDATE habits SET last_check = ? WHERE id = ?", (check_date, habit_id))
        connection.commit()
        connection.close()
        return True
    
    def delete(self, id):
        try:
            connection = sqlite3.connect(self.path)
            cursor = connection.cursor()
            cursor.execute("BEGIN TRANSACTION;")
            cursor.execute("DELETE FROM habits WHERE id = ?", (id,))
            connection.commit()
            connection.close()
        except:
            return False
        return True
    