import sqlite3

path = "../db/organizer.db"
connection = sqlite3.connect(path)
cursor = connection.cursor()

class User:
    def __init__(self, id):
        self.id = id
        self.name = cursor.execute("SELECT name FROM users WHERE id = ?", id)
        self.hash = cursor.execute("SELECT hash FROM users WHERE id = ?", id)

    # TODO: CRUD Functions