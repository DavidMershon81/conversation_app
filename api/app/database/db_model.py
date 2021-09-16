import pymysql
pymysql.install_as_MySQLdb()
from flask_sqlalchemy import SQLAlchemy
from time import sleep

db = SQLAlchemy()

def init_db(app, config):
    #import and configure database
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'

    #choose the appropriate database URL depending on if we're running in docker compose in production 
    # or with a standalone test db in development
    db_url_key = 'PRODUCTION_DATABASE_URL' if config['FLASK_ENV'] == 'production' else 'DEVELOPMENT_DATABASE_URL'
    app.config['SQLALCHEMY_DATABASE_URI'] = config[db_url_key]
    db.init_app(app)
    __connect(app)

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

class Validation(db.Model):
    __tablename__ = 'validations'
    id = db.Column(db.Integer, primary_key=True)
    guid = db.Column(db.Text)
    user_id = db.Column(db.Integer)


# Connect to the DB

def __connect(app):
    try:
        __try_connect(app)
    except KeyboardInterrupt:
        print('Interrupted database connect loop, exiting...')
        exit()
    
    
def __try_connect(app):
    db_connected = False
    while not db_connected:
        try:
            with app.app_context():
                db.create_all()
            db_connected = True
            print('Connected to DB!')
        except:
            print('Failed to connect to db, trying again...')
            sleep(5)
    