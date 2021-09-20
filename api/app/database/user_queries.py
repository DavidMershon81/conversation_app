from app.database.db_model import User, Member, Petition, Validation, db
from werkzeug.security import generate_password_hash

def get_users():
    return User.query.all()

def get_user(user_id):
    return User.query.filter_by(id=user_id).first()

def get_user_by_email(user_email):
    return User.query.filter_by(email=user_email).first()

def get_users_with_ids(user_ids):
    return User.query.filter(User.id.in_(user_ids)).all()

def get_petition_group_users(petition_group_id):
    return db.session.query(Member,User).\
        filter(Member.email == User.email, Member.petition_group_id==petition_group_id).\
            with_entities(User.id, User.email, User.first_name, User.last_name).all()

def get_petition_users(petition_id):
    return db.session.query(Member,User,Petition).\
        filter(Member.email == User.email, Member.petition_group_id==Petition.petition_group_id, Petition.id==petition_id).\
            with_entities(User.id, User.email, User.first_name, User.last_name).all()

def add_user(email, password, first_name, last_name):
    password_hashed = generate_password_hash(password)
    new_user = User(email=email, password=password_hashed, first_name=first_name, last_name=last_name, valid=False)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def validate_user(user_id):
    val_user = User.query.filter_by(id=user_id).first()
    val_user.valid = True
    val = Validation.query.filter_by(user_id=user_id).first()
    db.session.delete(val)
    db.session.commit()
    return val_user