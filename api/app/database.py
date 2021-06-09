from app import app
from dotenv import dotenv_values
import pymysql
pymysql.install_as_MySQLdb()
from flask_sqlalchemy import SQLAlchemy
from time import sleep
from werkzeug.security import generate_password_hash, check_password_hash

#import and configure database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'

#choose the appropriate database URL depending on if we're running in docker compose in production 
# or with a standalone test db in development
config = dotenv_values("app_env")
db_url_key = 'PRODUCTION_DATABASE_URL' if config['FLASK_ENV'] == 'production' else 'DEVELOPMENT_DATABASE_URL'
app.config['SQLALCHEMY_DATABASE_URI'] = config[db_url_key]
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text)
    password = db.Column(db.Text)
    first_name = db.Column(db.Text)
    last_name = db.Column(db.Text)

class PetitionGroup(db.Model):
    __tablename__ = 'petition_groups'
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.Text)
    listserv_email = db.Column(db.Text)

class Member(db.Model):
    __tablename__ = 'members'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text)
    petition_group_id = db.Column(db.Integer)

class Petition(db.Model):
    __tablename__ = 'petitions'
    id = db.Column(db.Integer, primary_key=True)
    petition_group_id = db.Column(db.Integer)
    subject = db.Column(db.Text)
    petition_text = db.Column(db.Text)

class Signature(db.Model):
    __tablename__ = 'signatures'
    id = db.Column(db.Integer, primary_key=True)
    petition_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    reveal_threshold = db.Column(db.Integer)


def add_signature(petition_id, user_id, reveal_threshold):
    new_signature = Signature(petition_id=petition_id, user_id=user_id, reveal_threshold=reveal_threshold)
    db.session.add(new_signature)
    db.session.commit()
    return new_signature

def get_signatures(petition_id):
    return Signature.query.filter_by(petition_id=petition_id).all()

def add_petition(petition_group_id, subject, petition_text):
    new_petition = Petition(petition_group_id=petition_group_id, subject=subject, petition_text=petition_text)
    db.session.add(new_petition)
    db.session.commit()
    return new_petition

def get_petitions(petition_group_id):
    return Petition.query.filter_by(petition_group_id=petition_group_id).all()

def get_petition(petition_id):
    return Petition.query.filter_by(id=petition_id).first()

def get_petition_groups():
    return PetitionGroup.query.all()

def get_petition_groups_by_user(user):
    return db.session.query(Member,PetitionGroup).\
        filter(Member.petition_group_id == PetitionGroup.id, Member.email==user.email).\
            with_entities(PetitionGroup.id, PetitionGroup.group_name, PetitionGroup.listserv_email).all()

def get_petition_group(petition_group_id):
    return PetitionGroup.query.filter_by(id=petition_group_id).first()

def add_petition_group(group_name, listserv_email):
    new_group = PetitionGroup(group_name=group_name, listserv_email=listserv_email)
    db.session.add(new_group)
    db.session.commit()
    return new_group

def add_members(emails, petition_group_id):
    new_members = [Member(email=email, petition_group_id=petition_group_id) for email in emails]
    for nm in new_members:
        db.session.add(nm)
    db.session.commit()
    return new_members

def add_members_to_petition(json, petition_group_id):
    member_emails = [ json[key] for key in json.keys() if 'custom_email_' in key ]
    return add_members(member_emails, petition_group_id)

def get_members(petition_group_id):
    return Member.query.filter_by(petition_group_id=petition_group_id).all()

def get_users():
    return User.query.all()

def get_user(user_id):
    return User.query.filter_by(id=user_id).first()

def get_users_with_ids(user_ids):
    return User.query.filter(User.id.in_(user_ids)).all()

def get_user_by_email(user_email):
    return User.query.filter_by(email=user_email).first()

def get_petition_group_users(petition_group_id):
    return db.session.query(Member,User).\
        filter(Member.email == User.email, Member.petition_group_id==petition_group_id).\
            with_entities(User.id, User.email, User.first_name, User.last_name).all()

def add_user(email, password, first_name, last_name):
    password_hashed = generate_password_hash(password)
    new_user = User(email=email, password=password_hashed, first_name=first_name, last_name=last_name)
    db.session.add(new_user)
    db.session.commit()
    return new_user

# Connect to the DB
def connect():
    try:
        _try_connect()
    except KeyboardInterrupt:
        print('Interrupted database connect loop, exiting...')
        exit()
    
    
def _try_connect():
    db_connected = False
    while not db_connected:
        try:
            db.create_all()
            db_connected = True
            print('Connected to DB!')
        except:
            print('Failed to connect to db, trying again...')
            sleep(5)