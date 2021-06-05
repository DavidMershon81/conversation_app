from flask import request, jsonify
from app import app
from app import database as db
from werkzeug.security import check_password_hash

@app.route('/api/login', methods=['POST'])
def login():
    json = request.json
    login_user = db.get_user_by_email(json['email'])
    if login_user:
        password_matches = check_password_hash(login_user.password, json['password'])
        if password_matches:
            return f"login attempt - email: {json['email']} - login attempt successful"
        else:
            return f"login attempt - email: {json['email']} - found user, but password doesn't match"
    else:
        return f"login attempt - email: {json['email']} - can't find user"
