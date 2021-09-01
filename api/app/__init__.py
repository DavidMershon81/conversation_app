from flask import Flask, session
from dotenv import dotenv_values

#init flask app
app = Flask(__name__, static_folder='../../build', static_url_path='/')
config = dotenv_values("app_env")
app.config['SECRET_KEY'] = config['SECRET_KEY']

#note - this should be strict when this is properly deployed
#but I think setting this to Lax is the only thing that's going to work
#until HTTPS is set up
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

#from app import database as db
import app.database.db_model as db
db.connect()

from app import email
email.init(app)

from app import front_end_views
from app.endpoints import user, petition_group, member, petition, signature, login, test
