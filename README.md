# Organizer
#### Video Demo:  <URL HERE>
#### Description:

## About
The Organizer is a website to help organize tasks and manage habits, with an elegant and functional web interface, featuring the main functions of similar apps like Google Tasks and TickTick Habit Tracker.

## 🧐 Features
Here're some of the project's best features:
- Easy task management: Tasks can be easily manipulated with the website interface (create, delete, mark and edit), each task written there is part of a user's private To-do list.

- Habit Tracking: The habit management system provides a visualization of essential information about them, for example, if you want to start running in the mornings, register the habit and each day you mark it as "done" your streak will increase, each habit has its own streak which is the number of days in a row that you did that.

- Pomodoro Timer: The Pomodoro Technique is a time management that divides work into 25-minute focus intervals, called "Pomodoros", followed by 5-minute breaks, with longer breaks after four sessions. This approach improves focus, reduces fatigue, and boosts productivity by breaking tasks into manageable chunks. Its structured breaks also enhance cognitive performance and time management skills, making it ideal for students and professionals, In the Organizer you can create pomodoro sessions with 25 minutes and a break of 5 or 15 minutes.

- Lightweight: Based on web technology, the Organizer client can run in any modern browser.

## 👨‍💻 Project Structure Index
```
.idx
src
├── __pycache__
├── database
├── models
│   ├── __pycache__
│   ├── Habit.py
│   ├── Model.py
│   ├── Task.py
│   └── User.py
├── static
│   ├── assets
│   ├── css
│   └── js
├── templates
├── app.py
├── helpers.py
LICENSE
README.md
requirements.txt
```
- `.idx`: Build for Project IDX (Google IDE, This is not necessary in VSCode or Codespaces).
- `src`: Main directory containing the source code.
- `src/database`: Directory for database (SQLite) and its SQL Code.
- `src/models`: I structured these models with the function of dividing the program into MVC (Model, View, Controller), these are the files that contain the classes that when I need to access the database I instantiate in `app.py`.
- `src/static`: Static files to complement the templates (styles, scripts, assets).
- `src/static/assets`: Media resources, like sounds and images.
- `src/static/css`: Styles for templates pages.
- `src/static/js`: JavaScript client-side interactions and AJAX Requests.
- `src/templates`: Dynamic HTML pages with Flask, in this folder are the pages of the GET method routes, such as tasks and register.
- `src/app.py`: Main file for start the server.
- `src/helpers.py`: Helper functions used in `models` and in `app.py`.
- `requirements.txt`: List of Python dependencies.

---

```
+------------------------------------+
|         Web Application            |
|              (Frontend)            |
|                                    |
|  +------------------------------+  |
|  |   User Actions (JS)          |  |
|  |                              |  |
|  | - Login / Register           |  |
|  | - View Tasks / Habits        |  |
|  | - Toggle Tasks               |  |
|  | - Add, Update, Delete Habits |  |
|  | - Pomodoro Timer             |  |
|  +------------------------------+  |
|            |                       |
|  JS makes AJAX Requests to         |
|  Flask backend to interact with    |
|  models like Task, Habit, User     |
+------------|-----------------------+
             |
             v
   +------------------------+
   |     Flask Backend      |
   |      (app.py)          |
   |                        |
   | +-----------------+    |
   | | /login          |    | <--- POST: Handle login form
   | +-----------------+    |
   | +-----------------+    |
   | | /register       |    | <--- POST: Handle register form
   | +-----------------+    |
   | +-----------------+    |
   | | /tasks          |    | <--- GET: Render tasks page
   | +-----------------+    |
   | +-------------------+  |
   | | /tasks/operations |  | <--- POST: Operations (add, update, delete, etc.)
   | +-------------------+  |
   | +-----------------+    |
   | | /habits         |    | <--- GET: Render habits page
   | +-----------------+    |
   | +--------------------+ |
   | | /habits/operations | | <--- POST: Operations (check, add, update, delete)
   | +--------------------+ |
   | +-----------------+    |
   | | /pomodoro       |    | <--- GET: Render pomodoro page
   | +-----------------+    |
   +------------------------+
             ^
             |
    +--------------------+
     Models (Task, Habit,  
      User)                
    +--------------------+  
    | Task Model         | 
    | Habit Model        | 
    | User Model         | 
    +--------------------+
             |  ^
             v  |
    +--------------------+  
    | SQLite Database    | 
    +--------------------+
```
### How it works:
#### Frontend (Web Application):
The user interacts with the web pages for tasks, habits, and pomodoro.
JavaScript sends AJAX requests to the backend (Flask) to handle operations such as login, task management, habit management, and pomodoro functionality in specific routes.

#### Backend (Flask):
Routes like /login, /register, /tasks, /habits, and /pomodoro handle GET and POST requests.
For operations (e.g., add, update, delete, toggle), the backend listens at /tasks/operations and /habits/operations routes, receiving data through JSON requests.

Example of JSON Operation Object:
```
{
  op: OPERATION_NAME,
  id: ID,
  ...
}
```

#### Models (Task, Habit, User):
The models interact with the database and perform the required operations (toggle a task, check a habit, etc).
The response is sent back to the frontend as a JSON object to indicate success or failure in the desired operation.

This architecture uses JavaScript to interact with Flask by using AJAX, creating a dynamic web application where actions on the frontend correspond to operations in the backend. Honestly, I don't know if this is the best way to organize and structure the project logic. If I had chosen a different framework (like Django or NextJS), it could have been more organized and simple. Despite this, I tried to apply as much as possible what I learned during CS50 and in my technical course in Systems Development, using concepts of encapsulation, MVC and object orientation.

## 💻 Built with
Technologies used in the project:
- Python
- Flask
- SQLite
- HTML
- CSS
- JS
- ~~A lot of Coffee~~

I would like to thank CS50 for involving me in learning more about programming, greetings from São Paulo, Brazil
