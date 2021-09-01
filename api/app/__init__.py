from flask import Flask
from dotenv import dotenv_values
from app.database.db_model import init_db
from app.email import init_email
from app.endpoints.test import bp_test_endpoints

def init_app():
    app = Flask(__name__, static_folder='../../build', static_url_path='/')
    config = dotenv_values("app_env")
    app.config['SECRET_KEY'] = config['SECRET_KEY']

    #note - this should be strict when this is properly deployed
    #but I think setting this to Lax is the only thing that's going to work
    #until HTTPS is set up
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

    app.register_blueprint(bp_test_endpoints)

    init_db(app, config)
    init_email(app)
    return app

app = init_app()

from app import front_end_views
from app.endpoints import user, petition_group, member, petition, signature, login
