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

class Petition(db.Model):
    __tablename__ = 'petitions'
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.Text)
    petition_text = db.Column(db.Text)
    listserv_email = db.Column(db.Text)

def get_all_petitions():
    return Petition.query.all()

def add_petition(group_name, petition_text, listserv_email):
    new_petition = Petition(group_name=group_name, petition_text=petition_text, listserv_email=listserv_email)
    db.session.add(new_petition)
    db.session.commit()
    return new_petition

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