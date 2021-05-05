from flask import Flask

#init flask app
app = Flask(__name__, static_folder='../../build', static_url_path='/')

from app import database as db
db.connect()

from app import views