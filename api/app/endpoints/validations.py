from flask import request, jsonify, Blueprint
from app import session_check
import app.database.validation_queries as vl_queries

#a test comment

bp_validation_endpoints = Blueprint('validation_endpoints', __name__)

@bp_validation_endpoints.route('/api/validations/<validation_hash>', methods=['POST'])
def validations(validation_hash):
        return jsonify({'message' : f"checking validation_hash: {validation_hash}"})#, 403

@bp_validation_endpoints.route('/api/test_add_validation/<user_id>', methods=['POST'])
def test_add_validation(user_id):
        new_validation = vl_queries.add_validation(user_id)
        return jsonify(validation_to_dict(new_validation))

def validation_to_dict(validation):
        return { 'id' : validation.id, 'guid' : validation.guid, 'user_id' : validation.user_id }