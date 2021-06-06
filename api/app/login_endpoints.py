from flask import request, make_response, jsonify
from app import app, tokens
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
            return tokens.generate_token(auth.username)
        else:
            return __invalid_login()
    else:
        return __invalid_login()

def __invalid_login():
    response_message = jsonify({'message' : 'invalid login'})
    return make_response(response_message, 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@app.route('/api/unprotected', methods=['GET'])
def unprotected():
    return jsonify({'message' : 'anyone can read this'})

@app.route('/api/protected', methods=['GET'])
@tokens.token_required
def protected(current_user):
    return jsonify({'message' : 'only people with a token can read this', 'current_user.email' : current_user.email })