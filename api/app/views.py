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
    return { 'id':p.id, 'group_name':p.group_name, 'petition_text':p.petition_text, 'listserv_email':p.listserv_email }

@app.route('/api/get_petitions', methods=['GET'])
def get_petitions():
    all_petitions = db.get_all_petitions()
    petition_list = [petition_to_dict(p) for p in all_petitions]
    return jsonify(petition_list)

@app.route('/api/add_petition', methods=['POST'])
def add_petition():
    group_name = request.json['group_name']
    petition_text = request.json['petition_text']
    use_custom_emails = request.json['email_type'] == 'custom_emails'
    listserv_email = 'custom_emails' if use_custom_emails else request.json['listserv_email']
    new_petition = db.add_petition(group_name, petition_text, listserv_email)
    return jsonify(petition_to_dict(new_petition))

