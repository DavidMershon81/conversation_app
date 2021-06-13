from flask import request, jsonify
from app import app, tokens, signature_reveal
from app import database as db

def signature_to_dict(s):
    return { 'id':s.id, 'petition_id' : s.petition_id, 'user_id':s.user_id, 'reveal_threshold':s.reveal_threshold }

@app.route('/api/signatures', methods=['GET', 'POST'])
@tokens.token_required
def signatures(current_user):
    if request.method == 'GET':
        return get_revealed_signatures(request.args['petition_id'])
    elif request.method == 'POST':
        return try_sign_petition(current_user, request.json['petition_id'], request.json['reveal_threshold'])

def try_sign_petition(current_user, petition_id, reveal_threshold):
    user_id = current_user.id
    user_signed = db.did_user_sign_petition(petition_id, user_id)
    not_in_group = user_id not in [u.id for u in db.get_petition_users(petition_id)]

    if user_signed:
        print('user already signed, returning error message')
        return jsonify({ 'message' : 'user_already_signed'}),403
    elif not_in_group:
        print('user not in petition group, returning error message')
        return jsonify({ 'message' : 'user_not_in_group'}),403
    else:
        print('adding new signature')
        new_signature = db.add_signature(petition_id=petition_id, user_id=user_id, reveal_threshold=reveal_threshold)
        return signature_to_dict(new_signature)

def get_revealed_signatures(petition_id):
    signatures_raw = db.get_signatures(petition_id)
    revealed_sigs = signature_reveal.get_signatures_for_endpoint(signatures_raw)
    return jsonify(revealed_sigs)

@app.route('/api/user_signed', methods=['GET'])
@tokens.token_required
def user_signed(current_user):
    user_signed = db.did_user_sign_petition(request.args['petition_id'], current_user.id)
    return jsonify({ 'user_signed' : user_signed})