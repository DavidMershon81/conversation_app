from flask import request, jsonify, Blueprint
from app import session_check
import app.database.validation_queries as vl_queries
import app.database.user_queries as u_queries

bp_validation_endpoints = Blueprint('validation_endpoints', __name__)

@bp_validation_endpoints.route('/api/validations', methods=['POST'])
def validations():
        guid =request.json['guid']
        validation = vl_queries.get_validation(guid)
        if validation:
                val_user = u_queries.validate_user(validation.user_id)
                email = val_user.email
                return jsonify({'message' : f"Validated user: {email}"})
        else:
                return jsonify({'message' : f"There is no validation for guid: {guid}"}), 403