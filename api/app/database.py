from app import app
from dotenv import dotenv_values
import pymysql
pymysql.install_as_MySQLdb()
from flask_sqlalchemy import SQLAlchemy
from time import sleep

#import and configure database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'

#choose the appropriate database URL depending on if we're running in docker compose in production 
# or with a standalone test db in development
config = dotenv_values("app_env")
db_url_key = 'PRODUCTION_DATABASE_URL' if config['FLASK_ENV'] == 'production' else 'DEVELOPMENT_DATABASE_URL'
db_url = config[db_url_key]
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

flask_env = config['FLASK_ENV']
print(f"flaks_env: {flask_env}")

db = SQLAlchemy(app)

class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))

def get_all_cities():
    return City.query.all()

def add_city(city_name):
    new_city = City(name=city_name)
    db.session.add(new_city)
    db.session.commit()
    print(f"adding city to DB... id:{new_city.id} name: {new_city.name}")
    return new_city

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