from flask import request, jsonify
from app import app, tokens
from app import database as db

@app.route('/api/members', methods=['GET', 'POST'])
@tokens.token_required
def members(current_user):
    print(f"hit members endpoint method:{request.method}")
    if request.method == 'GET':
        petition_group_id = request.args['petition_group_id']
        return jsonify([ member_to_dict(member) for member in db.get_members(petition_group_id)])
    elif request.method == 'POST':
        return db.add_members_to_petition(request.json, request.json['petition_group_id'])

def member_to_dict(member):
    return { 'id' : member.id, 'email' : member.email, 'petition_group_id' : member.petition_group_id }