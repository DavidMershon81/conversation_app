from flask import request, jsonify, Blueprint
from app import utilities
import app.database.user_queries as u_queries
import app.database.validation_queries as vl_queries

bp_user_endpoints = Blueprint('user_endpoints', __name__)

@bp_user_endpoints.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        if 'petition_group_id' in request.args:
            return get_users_in_group(request.args['petition_group_id'])
        else:
            return get_all_users()
    elif request.method == 'POST':
        return add_user(request.json)

def get_users_in_group(petition_group_id):
    print(f"petition_group_id: {petition_group_id}")
    petition_users = u_queries.get_petition_group_users(petition_group_id)
    return jsonify([ user_to_dict(user) for user in petition_users])

def get_all_users():
    return jsonify([ user_to_dict(user) for user in  u_queries.get_users()])

def add_user(json):
    params_present = utilities.check_required_params(request_params=json, required_params=['email','password','first_name','last_name'])
    if not params_present:
        return jsonify({'message' : 'missing required json params!'}), 403    
    
    user_email =json['email']
    user_already_exists = u_queries.get_user_by_email(user_email=user_email)
    if(user_already_exists):
        return jsonify({'message' : f"user with email {user_email} already exists"}), 403 
    
    new_user = u_queries.add_user(user_email, json['password'], json['first_name'], json['last_name'])
    vl_queries.add_validation(new_user.id)
    return jsonify(user_to_dict(new_user))

@bp_user_endpoints.route('/api/users/<user_id>', methods=['GET'])
def user(user_id):
    user = u_queries.get_user(user_id)
    return jsonify(user_to_dict(user))

def user_to_dict(user):
    return { 'id' : user.id, 'email' : user.email, 'first_name' : user.first_name, 'last_name' : user.last_name, 'valid' : user.valid }