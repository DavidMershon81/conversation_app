from flask import jsonify
import app.database.db_model as db
from app import session
from functools import wraps

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