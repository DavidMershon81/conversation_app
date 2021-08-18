from flask import jsonify
from app import database as db
from app import session
from functools import wraps
from app import utilities

def session_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_email = session.get('user_email')

        if not user_email:
            return jsonify({'message' : 'Not logged in!'}), 403

        current_user = db.get_user_by_email(user_email)
        if not current_user:
            return jsonify({'message' : 'Not logged in!'}), 403

        return f(current_user, *args, **kwargs)
    
    return decorated