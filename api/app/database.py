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
    name = db.Column(db.Text)
    password = db.Column(db.Text)

class PetitionGroup(db.Model):
    __tablename__ = 'petition_groups'
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.Text)
    petition_text = db.Column(db.Text)
    listserv_email = db.Column(db.Text)

class Member(db.Model):
    __tablename__ = 'members'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text)
    petition_group_id = db.Column(db.Integer)

def get_all_petition_groups():
    return PetitionGroup.query.all()

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

def get_members(petition_group_id):
    return db.session.query(Member).filter(Member.petition_group_id == petition_group_id)

def get_all_users():
    return User.query.all()

def add_user(username, password):
    password_hashed = generate_password_hash(password)
    new_user = User(name=username, password=password_hashed)
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