import sqlite3
import helpers
import models.Model as Model
from datetime import datetime

class Habit(Model.Database):
    def get(self, user_id, habit_id):
        try:
            with sqlite3.connect(self.path) as connection:
                cursor = connection.cursor()
                cursor.execute("SELECT id, name, streak, last_check FROM habits WHERE user_id = ?", (user_id,))
                habit = cursor.fetchall()
        except Exception: return False
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
    
    def check(self, id):
        try:
            with sqlite3.connect(self.path) as connection:
                cursor = connection.cursor()
                actual_date = helpers.get_date()
                
                # Get streak and last_check
                cursor.execute("SELECT streak, last_check FROM habits WHERE id = ?", (id,))
                row = cursor.fetchone()
                if not row:
                    return False
                
                streak, last_check = row

                # Convert dates to datetime
                actual_date_obj = datetime.strptime(actual_date, "%Y-%m-%d")
                last_check_obj = datetime.strptime(last_check, "%Y-%m-%d")

                # If user skip a day reset streak
                if (actual_date_obj - last_check_obj).days > 1:
                    streak = 0
                
                # Toggle logic
                if actual_date == last_check:
                    # If already checked today, toggle to "uncheck"
                    last_check_minus = helpers.subtract_days(actual_date, 1)
                    cursor.execute(
                        "UPDATE habits SET last_check = ?, streak = streak - 1 WHERE id = ?",
                        (last_check_minus, id)
                    )
                    return True
                else:
                    # Otherwise, mark as checked
                    streak += 1
                    cursor.execute(
                        "UPDATE habits SET streak = ?, last_check = ? WHERE id = ?",
                        (streak, actual_date, id)
                    )
                    return True
        except Exception as e:
            print(f"Error: {e}")
            return False
        
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

    def update(self, id, name):
        try:
            connection = sqlite3.connect(self.path)
            cursor = connection.cursor()
            cursor.execute("BEGIN TRANSACTION;")
            cursor.execute("UPDATE habits SET name = ? WHERE id = ?", (name, id))
            connection.commit()
            connection.close()
        except:
            return False
        return True