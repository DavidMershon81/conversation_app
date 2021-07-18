from flask import jsonify
from app import database as db
from app import session
from functools import wraps

def session_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_email = session.get('user_email')

        if not user_email:
            return jsonify({'message' : 'Not logged in!'}), 403

        current_user = db.get_user_by_email(user_email)
        print(current_user.email)

        return f(current_user, *args, **kwargs)
    
    return decorated