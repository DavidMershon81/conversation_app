from flask import request, jsonify, Blueprint
from app import session_check
import app.database.validation_queries as vl_queries


bp_validation_endpoints = Blueprint('validation_endpoints', __name__)

@bp_validation_endpoints.route('/api/validations', methods=['POST'])
def validations():
        guid =request.json['guid']
        print(f"hit validations endpoint guid: {guid}")
        return jsonify({'message' : f"checking validation guid: {guid}"})#, 403

"""
def validation_to_dict(validation):
        return { 'id' : validation.id, 'guid' : validation.guid, 'user_id' : validation.user_id }
"""