from flask import request, jsonify
from app import database as db
from app import session
#import jwt
from functools import wraps
from dotenv import dotenv_values
import datetime

"""
config = dotenv_values("app_env")
secret_key = config['SECRET_KEY']

def generate_token(email):
    token = jwt.encode({ 'email' : email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30) }, secret_key, algorithm='HS256')
    return jsonify({'token' : token })
"""

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        #token = request.headers.get('Authorization')
        user_email = session.get('user_email')

        if not user_email:
            return jsonify({'message' : 'Not logged in!'}), 403

        current_user = db.get_user_by_email(user_email)
        print(current_user.email)
        """
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403

        try:
            token_data = jwt.decode(token, secret_key, algorithms=['HS256'])
            current_user = db.get_user_by_email(token_data['email'])
        except:
            return jsonify({'message' : 'Token is invalid!'}), 403
        """
        return f(current_user, *args, **kwargs)
    
    return decorated