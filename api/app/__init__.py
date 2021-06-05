from flask import Flask

#init flask app
app = Flask(__name__, static_folder='../../build', static_url_path='/')

from app import database as db
db.connect()

from app import front_end_views
from app import user_endpoints
from app import petition_group_endpoints
from app import member_endpoints
from app import petition_endpoints
from app import signature_endpoints
from app import login_endpoints