from flask import request, jsonify
from app import app
from app import database as db

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

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

def group_to_dict(g):
    return { 'id':g.id, 'group_name':g.group_name, 'listserv_email':g.listserv_email }

@app.route('/api/get_petition_groups', methods=['GET'])
def get_petition_groups():
    petition_groups = db.get_all_petition_groups()
    group_list = [group_to_dict(g) for g in petition_groups]
    return jsonify(group_list)

@app.route('/api/add_petition_group', methods=['POST'])
def add_petition_group():
    json = request.json
    group_name = json['group_name']
    use_custom_emails = json['email_type'] == 'custom_emails'
    listserv_email = 'custom_emails' if use_custom_emails else json['listserv_email']
    new_group = db.add_petition_group(group_name=group_name, listserv_email=listserv_email)

    if use_custom_emails:
        add_members_to_petition(json, new_group.id)

    return jsonify(group_to_dict(new_group))

@app.route('/api/get_members/<petition_group_id>', methods=['GET'])
def get_members(petition_group_id):
    print(f"get_members running - {petition_group_id}")
    all_members = db.get_members(petition_group_id)
    return jsonify([ member_to_dict(member) for member in all_members])

@app.route('/api/add_members', methods=['POST'])
def add_members(json, petition_group_id):
    return add_members_to_petition(json, petition_group_id)

def add_members_to_petition(json, petition_id):
    member_emails = [ json[key] for key in json.keys() if 'custom_email_' in key ]
    return db.add_members(member_emails, petition_id)

def member_to_dict(member):
    return { 'id' : member.id, 'email' : member.email, 'petition_group_id' : member.petition_group_id }