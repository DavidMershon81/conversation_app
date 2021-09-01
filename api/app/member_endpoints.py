from flask import request, jsonify
from app import app, session_check
import app.database.member_queries as mb_queries

@app.route('/api/members', methods=['GET'])
@session_check.session_required
def members(current_user):
    #this will have a post menthod eventually when listserv groups are fleshed out
    #but right now the only time new members are added is when a petition group is created
    if request.method == 'GET':
        petition_group_id = request.args['petition_group_id']
        return jsonify([ member_to_dict(member) for member in mb_queries.get_members(petition_group_id)])

def member_to_dict(member):
    return { 'id' : member.id, 'email' : member.email, 'petition_group_id' : member.petition_group_id }