from flask import request, jsonify
from app import app, tokens
from app import database as db

def group_to_dict(g):
    return { 'id':g.id, 'group_name':g.group_name, 'listserv_email':g.listserv_email }

@app.route('/api/petition_groups', methods=['GET', 'POST'])
@tokens.token_required
def petition_groups(current_user):
    if request.method == 'GET':
        #petition_groups = [group_to_dict(g) for g in db.get_petition_groups()]
        petition_groups = [group_to_dict(g) for g in db.get_petition_groups_by_user(current_user)]
        
        return jsonify(petition_groups)
    elif request.method == 'POST':
        json = request.json
        use_custom_emails = json['email_type'] == 'custom_emails'
        listserv_email = 'custom_emails' if use_custom_emails else json['listserv_email']
        new_group = db.add_petition_group(group_name=json['group_name'], listserv_email=listserv_email)
        if use_custom_emails:
            db.add_members_to_petition(json, new_group.id)
        return jsonify(group_to_dict(new_group))

@app.route('/api/petition_groups/<petition_group_id>', methods=['GET'])
@tokens.token_required
def petition_group(current_user, petition_group_id):
    petition_group = db.get_petition_group(petition_group_id)
    return jsonify(group_to_dict(petition_group))