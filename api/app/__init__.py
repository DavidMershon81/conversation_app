from flask import Flask, request, jsonify

#init flask app
app = Flask(__name__, static_folder='../../build', static_url_path='/')

from app import database as db
db.connect()

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/get_users', methods=["GET"])
def get_users():
    all_users = db.get_all_users()
    return jsonify([ { 'id' : user.id, 'name' : user.name } for user in all_users])

@app.route('/api/add_user', methods=["POST"])
def add_user():
    user_name = request.json['username']
    password = request.json['password']
    new_user = db.add_user(user_name, password)
    return jsonify({ 'id' : new_user.id, 'name' : new_user.name })
    