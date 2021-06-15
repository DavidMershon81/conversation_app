from flask import Flask, session
from dotenv import dotenv_values

#init flask app
app = Flask(__name__, static_folder='../../build', static_url_path='/')
config = dotenv_values("app_env")
app.config['SECRET_KEY'] = config['SECRET_KEY']

from app import database as db
db.connect()

from app import front_end_views
from app import user_endpoints
from app import petition_group_endpoints
from app import member_endpoints
from app import petition_endpoints
from app import signature_endpoints
from app import login_endpoints