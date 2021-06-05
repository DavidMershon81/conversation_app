from flask import request, make_response, jsonify
import jwt
import datetime
from dotenv import dotenv_values
from app import app
from app import database as db
from werkzeug.security import check_password_hash

config = dotenv_values("app_env")
secret_key = config['JWT_SECRET_KEY']

@app.route('/api/login', methods=['POST'])
def login():
    auth = request.authorization
    login_user = db.get_user_by_email(auth.username)
    
    if login_user:
        password_matches = check_password_hash(login_user.password, auth.password)
        if password_matches:
            return generate_token(auth.username)
        else:
            return make_response(f"invalid password", 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})
    else:
        return make_response(f"invalid user", 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

def generate_token(email):
    token = jwt.encode({ 'email' : email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30) }, secret_key)
    return jsonify({'token' : token })