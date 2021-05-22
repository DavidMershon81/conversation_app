from flask import json, request, jsonify
from app import app
from app import database as db

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

#users //////////////////////////////////////////
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

#petition groups //////////////////////////////////////////
def group_to_dict(g):
    return { 'id':g.id, 'group_name':g.group_name, 'listserv_email':g.listserv_email }

@app.route('/api/petition_groups', methods=['GET', 'POST'])
def petition_groups():
    if request.method == 'GET':
        petition_groups = [group_to_dict(g) for g in db.get_petition_groups()]
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
    petition_group = db.get_petition_group(petition_group_id)
    return jsonify(group_to_dict(petition_group))

#members //////////////////////////////////////////
@app.route('/api/members', methods=['GET', 'POST'])
def members():
    print(f"hit members endpoint method:{request.method}")
    if request.method == 'GET':
        petition_group_id = request.args['petition_group_id']
        return jsonify([ member_to_dict(member) for member in db.get_members(petition_group_id)])
    elif request.method == 'POST':
        return add_members_to_petition(request.json, request.json['petition_group_id'])

def add_members_to_petition(json, petition_group_id):
    member_emails = [ json[key] for key in json.keys() if 'custom_email_' in key ]
    return db.add_members(member_emails, petition_group_id)

def member_to_dict(member):
    return { 'id' : member.id, 'email' : member.email, 'petition_group_id' : member.petition_group_id }

#petitions //////////////////////////////////////////
def petition_to_dict(p):
    return { 'id':p.id, 'petition_group_id' : p.petition_group_id, 'group_name':p.petition_text }

@app.route('/api/petitions', methods=['GET', 'POST'])
def petitions():
    if request.method == 'GET':
        petitions = [petition_to_dict(p) for p in db.get_petitions()]
        return jsonify(petitions)
    elif request.method == 'POST':
        json = request.json
        new_petition = db.add_petition(petition_group_id=json['petition_group_id'], petition_text=json['petition_text'])
        return petition_to_dict(new_petition)