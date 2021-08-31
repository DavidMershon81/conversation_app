from flask import request, jsonify
from app import app, session_check
import app.database.db_model as db
import app.database.petition_group_queries as pg_queries

@app.route('/api/petition_groups', methods=['GET', 'POST'])
@session_check.session_required
def petition_groups(current_user):
    if request.method == 'GET':
        return get_petition_groups_by_user(current_user)
    elif request.method == 'POST':
        return add_petition_group(json=request.json, current_user=current_user)

@app.route('/api/petition_groups/<petition_group_id>', methods=['GET'])
@session_check.session_required
def petition_group(current_user, petition_group_id):
    petition_group = pg_queries.get_petition_group(petition_group_id)
    all_group_ids_this_user = [g.id for g in pg_queries.get_petition_groups_by_user(current_user)]
    if petition_group.id in all_group_ids_this_user:
        return jsonify(group_to_dict(petition_group))
    else:
        return jsonify({'message' : f"user {current_user.email}is not a member of this petition group"}), 403    

def get_petition_groups_by_user(current_user):
    return jsonify([group_to_dict(g) for g in pg_queries.get_petition_groups_by_user(current_user)])

def add_petition_group(json, current_user):
    use_custom_emails = json['email_type'] == 'custom_emails'
    listserv_email = 'custom_emails' if use_custom_emails else json['listserv_email']
    new_group = pg_queries.add_petition_group(group_name=json['group_name'], listserv_email=listserv_email)
    if use_custom_emails:
        db.add_members_to_petition_group(json=json, petition_group_id=new_group.id, current_user=current_user)
    return jsonify(group_to_dict(new_group))

def group_to_dict(g):
    return { 'id':g.id, 'group_name':g.group_name, 'listserv_email':g.listserv_email }