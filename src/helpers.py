from flask import redirect, session
from functools import wraps
from datetime import datetime

def get_date():
    current_date = datetime.now()
    sql_date = current_date.strftime('%Y-%m-%d')
    return sql_date


def login_required(f):
    """
    Decorate routes to require login.

    https://flask.palletsprojects.com/en/latest/patterns/viewdecorators/
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("id") is None:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function
