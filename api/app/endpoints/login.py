from flask import request, make_response, jsonify, session, Blueprint
from app import session_check
import app.database.user_queries as u_queries
from werkzeug.security import check_password_hash
from datetime import timedelta

bp_login_endpoints = Blueprint('login_endpoints', __name__)

@bp_login_endpoints.route('/api/login')
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return __invalid_login()

    login_user = u_queries.get_user_by_email(auth.username)
    
    if login_user:
        password_matches = check_password_hash(login_user.password, auth.password)
        if password_matches:
            begin_new_session(auth.username)
            return jsonify({'message' : 'login_successful', 'username' : session['user_email']})
        else:
            return __invalid_login()
    else:
        return __invalid_login()

def begin_new_session(user_email):
    session.permanent = True
    bp_login_endpoints.permanent_session_lifetime = timedelta(minutes=30)
    session['user_email'] = user_email

def __invalid_login():
    response_message = jsonify({'message' : 'invalid login'})
    return make_response(response_message, 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@bp_login_endpoints.route('/api/get_current_user')
@session_check.session_required
def get_current_user(current_user):
    return jsonify({ "user_email" : current_user.email })

@bp_login_endpoints.route('/api/logout', methods=['POST'])
@session_check.session_required
def logout(current_user):
    session.clear()
    return jsonify({'message' : 'logout_successful'}) 

