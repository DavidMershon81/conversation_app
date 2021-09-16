from app.database.db_model import Validation, db
import uuid

def add_validation(user_id):
    guid = str(uuid.uuid4())
    new_validation = Validation(guid=guid, user_id=user_id)
    db.session.add(new_validation)
    db.session.commit()
    return new_validation