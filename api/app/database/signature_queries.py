from app.database.db_model import Signature, db

def add_signature(petition_id, user_id, reveal_threshold):
    new_signature = Signature(petition_id=petition_id, user_id=user_id, reveal_threshold=reveal_threshold)
    db.session.add(new_signature)
    db.session.commit()
    return new_signature

def get_signatures(petition_id):
    return Signature.query.filter_by(petition_id=petition_id).all()

def did_user_sign_petition(petition_id, user_id):
    matches = Signature.query.filter_by(petition_id=petition_id, user_id=user_id).all()
    return len(matches) > 0