from flask import request, jsonify, Blueprint
from app import session_check
#import app.database.petition_group_queries as pg_queries
#import app.database.member_queries as mb_queries

bp_validation_endpoints = Blueprint('validation_endpoints', __name__)

@bp_validation_endpoints.route('/api/validations/<validation_hash>', methods=['POST'])
#@session_check.session_required
def validations(validation_hash):
        return jsonify({'message' : f"checking validation_hash: {validation_hash}"})#, 403