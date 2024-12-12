from flask import redirect, session
from functools import wraps
from datetime import datetime, timedelta

def difference_in_days(date_str1, date_str2, date_format="%Y-%m-%d"):
    try:
        date1 = datetime.strptime(date_str1, date_format)
        date2 = datetime.strptime(date_str2, date_format)
        difference = date1 - date2
        return abs(difference.days)
    except ValueError as e:
        return f"Error: {e}"

def subtract_days(date_str, days_to_subtract, date_format=f"%Y-%m-%d"):
    try:
        date_obj = datetime.strptime(date_str, date_format)
        new_date = date_obj - timedelta(days=days_to_subtract)
        return new_date.strftime(date_format)
    except ValueError as e:
        return f"Error: {e}"


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
