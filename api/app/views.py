from flask import request, jsonify
from app import app
from app import database as db

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

#users
def user_to_dict(user):
    return { 'id' : user.id, 'name' : user.name }

@app.route('/api/get_users', methods=['GET'])
def get_users():
    all_users = db.get_all_users()
    return jsonify([ user_to_dict(user) for user in all_users])

@app.route('/api/add_user', methods=['POST'])
def add_user():
    user_name = request.json['username']
    password = request.json['password']
    new_user = db.add_user(user_name, password)
    return jsonify(user_to_dict(new_user))

#petitions
def petition_to_dict(p):
    return { 'id' :p.id, 'text' : p.text, 'email_domain' : p.email_domain, 'max_users' : p.max_users }

@app.route('/api/get_petitions', methods=['GET'])
def get_petitions():
    all_petitions = db.get_all_petitions()
    petition_list = [petition_to_dict(p) for p in all_petitions]
    return jsonify(petition_list)

@app.route('/api/add_petition', methods=['POST'])
def add_petition():
    text = request.json['text']
    email_domain = request.json['email_domain']
    max_users = request.json['max_users']
    new_petition = db.add_petition(text, email_domain, max_users)
    return jsonify(petition_to_dict(new_petition))

