from flask import request, make_response, jsonify
from app import app, tokens
from app import database as db
from werkzeug.security import check_password_hash

@app.route('/api/login', methods=['POST'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return __could_not_verify()

    login_user = db.get_user_by_email(auth.username)
    
    if login_user:
        password_matches = check_password_hash(login_user.password, auth.password)
        if password_matches:
            return tokens.generate_token(auth.username)
        else:
            return __could_not_verify()
    else:
        return __could_not_verify()

def __could_not_verify():
    return make_response(f"could not verify", 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@app.route('/api/unprotected', methods=['GET'])
def unprotected():
    return jsonify({'message' : 'anyone can read this'})

@app.route('/api/protected', methods=['GET'])
@tokens.token_required
def protected(token_data):
    return jsonify({'message' : 'only people with a token can read this', 'token_data' : token_data })