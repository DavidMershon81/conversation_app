from flask import request, jsonify
from app import app
from app import database as db

def user_to_dict(user):
    return { 'id' : user.id, 'email' : user.email, 'first_name' : user.first_name, 'last_name' : user.last_name }

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        if 'petition_group_id' in request.args:
            petition_group_id = request.args['petition_group_id']
            print(f"petition_group_id: {petition_group_id}")
            petition_users = db.get_petition_group_users(petition_group_id)
            return jsonify([ user_to_dict(user) for user in petition_users])
        else:
            return jsonify([ user_to_dict(user) for user in  db.get_users()])
    elif request.method == 'POST':
        json = request.json
        new_user = db.add_user(json['email'], json['password'], json['first_name'], json['last_name'])
        return jsonify(user_to_dict(new_user))

@app.route('/api/users/<user_id>', methods=['GET'])
def user(user_id):
    user = db.get_user(user_id)
    return jsonify(user_to_dict(user))