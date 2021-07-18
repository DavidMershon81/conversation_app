from flask import request, make_response, jsonify
from app import app, session, session_check
from app import database as db
from werkzeug.security import check_password_hash

@app.route('/api/login')
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return __invalid_login()

    login_user = db.get_user_by_email(auth.username)
    
    if login_user:
        password_matches = check_password_hash(login_user.password, auth.password)
        if password_matches:
            session['user_email'] = auth.username
            return jsonify({'message' : 'login_successful'})
            #return tokens.generate_token(auth.username)
        else:
            return __invalid_login()
    else:
        return __invalid_login()

def __invalid_login():
    response_message = jsonify({'message' : 'invalid login'})
    return make_response(response_message, 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@app.route('/api/get_current_user')
@session_check.session_required
def get_current_user(current_user):
    return jsonify({ "user_email" : current_user.email })

@app.route('/api/logout', methods=['POST'])
@session_check.session_required
def logout(current_user):
    print('hit logout endpoint')
    session.clear()
    return jsonify({'message' : 'logout_successful'}) 

