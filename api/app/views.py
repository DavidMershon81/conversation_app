from flask import request, jsonify
from app import app
from app import database as db

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

def user_to_dict(user):
    return { 'id' : user.id, 'email' : user.email, 'first_name' : user.first_name, 'last_name' : user.last_name }

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        return jsonify([ user_to_dict(user) for user in  db.get_users()])
    elif request.method == 'POST':
        json = request.json
        new_user = db.add_user(json['email'], json['password'], json['first_name'], json['last_name'])
        return jsonify(user_to_dict(new_user))
    
def group_to_dict(g):
    return { 'id':g.id, 'group_name':g.group_name, 'listserv_email':g.listserv_email }

@app.route('/api/petition_groups', methods=['GET', 'POST'])
def petition_groups():
    if request.method == 'GET':
        petition_groups = [group_to_dict(g) for g in db.get_all_petition_groups()]
        return jsonify(petition_groups)
    elif request.method == 'POST':
        json = request.json
        use_custom_emails = json['email_type'] == 'custom_emails'
        listserv_email = 'custom_emails' if use_custom_emails else json['listserv_email']
        new_group = db.add_petition_group(group_name=json['group_name'], listserv_email=listserv_email)
        if use_custom_emails:
            add_members_to_petition(json, new_group.id)
        return jsonify(group_to_dict(new_group))

@app.route('/api/petition_groups/<petition_group_id>', methods=['GET'])
def petition_group(petition_group_id):
    print(f"get_petition_group running - {petition_group_id}")
    petition_group = db.get_petition_group(petition_group_id)
    return jsonify(group_to_dict(petition_group))

@app.route('/api/members/<petition_group_id>', methods=['GET'])
def member(petition_group_id):
    return jsonify([ member_to_dict(member) for member in db.get_members(petition_group_id)])

@app.route('/api/members', methods=['POST'])
def members(json, petition_group_id):
    return add_members_to_petition(json, petition_group_id)

def add_members_to_petition(json, petition_id):
    member_emails = [ json[key] for key in json.keys() if 'custom_email_' in key ]
    return db.add_members(member_emails, petition_id)

def member_to_dict(member):
    return { 'id' : member.id, 'email' : member.email, 'petition_group_id' : member.petition_group_id }