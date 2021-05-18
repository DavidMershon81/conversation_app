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
def group_to_dict(g):
    return { 'id':g.id, 'group_name':g.group_name, 'listserv_email':g.listserv_email }

@app.route('/api/get_petition_groups', methods=['GET'])
def get_petition_groups():
    petition_groups = db.get_all_petition_groups()
    group_list = [group_to_dict(g) for g in petition_groups]
    return jsonify(group_list)

@app.route('/api/add_petition_group', methods=['POST'])
def add_petition_group():
    group_name = request.json['group_name']
    use_custom_emails = request.json['email_type'] == 'custom_emails'
    listserv_email = 'custom_emails' if use_custom_emails else request.json['listserv_email']
    new_group = db.add_petition_group(group_name=group_name, listserv_email=listserv_email)
    return jsonify(group_to_dict(new_group))

