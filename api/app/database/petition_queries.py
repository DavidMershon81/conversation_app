from app.database.db_model import Petition, db

def get_petition(petition_id):
    return Petition.query.filter_by(id=petition_id).first()

def get_petitions(petition_group_id):
    return Petition.query.filter_by(petition_group_id=petition_group_id).all()

def add_petition(petition_group_id, subject, petition_text):
    new_petition = Petition(petition_group_id=petition_group_id, subject=subject, petition_text=petition_text)
    db.session.add(new_petition)
    db.session.commit()
    return new_petition