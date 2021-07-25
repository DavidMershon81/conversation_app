from flask import jsonify
from app import database as db
from app import session
from functools import wraps
from app import utilities

def session_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_email = session.get('user_email')
        exp_timestamp = session.get('exp_timestamp')

        if not user_email or not exp_timestamp:
            return jsonify({'message' : 'Not logged in!'}), 403
        
        session_expired = utilities.check_timestamp_expired(exp_timestamp)
        print(f"exp_timestamp: {exp_timestamp} | session_expired: {session_expired}")
        if session_expired:
            return jsonify({'message' : 'Session Expired'}), 403

        current_user = db.get_user_by_email(user_email)

        return f(current_user, *args, **kwargs)
    
    return decorated