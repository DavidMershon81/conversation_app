from app.database.db_model import Validation, User, db
import uuid

def add_validation(user_id):
    guid = str(uuid.uuid4())
    new_validation = Validation(guid=guid, user_id=user_id)
    db.session.add(new_validation)
    db.session.commit()
    return new_validation

def get_validation(guid):
    return Validation.query.filter_by(guid=guid).first()