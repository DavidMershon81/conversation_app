from flask import request, jsonify
from app import app, tokens, signature_reveal
from app import database as db

def signature_to_dict(s):
    return { 'id':s.id, 'petition_id' : s.petition_id, 'user_id':s.user_id, 'reveal_threshold':s.reveal_threshold }

@app.route('/api/signatures', methods=['GET', 'POST'])
@tokens.token_required
def signatures(current_user):
    print('signatures API')
    if request.method == 'GET':
        return get_revealed_signatures(request.args['petition_id'])
    elif request.method == 'POST':
        json = request.json
        new_signature = db.add_signature(petition_id=json['petition_id'], user_id=json['user_id'], reveal_threshold=json['reveal_threshold'])
        return signature_to_dict(new_signature)

def get_revealed_signatures(petition_id):
    signatures_raw = db.get_signatures(petition_id)
    revealed_sigs = signature_reveal.get_signatures_for_endpoint(signatures_raw)
    return jsonify(revealed_sigs)