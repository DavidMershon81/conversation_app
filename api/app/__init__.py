from flask import Flask
from dotenv import dotenv_values
from app.database.db_model import init_db
from app.email import init_email
from app.endpoints.test import bp_test_endpoints
from app.endpoints.signature import bp_signature_endpoints
from app.endpoints.petition import bp_petition_endpoints
from app.endpoints.petition_group import bp_petition_group_endpoints
from app.endpoints.user import bp_user_endpoints
from app.endpoints.member import bp_member_endpoints
from app.endpoints.login import bp_login_endpoints
from app.endpoints.validations import bp_validation_endpoints
from app.front_end_views import bp_front_end_views


def init_app():
    app = Flask(__name__, static_folder='/static', static_url_path='/static_main')
    config = dotenv_values("app_env")
    app.config['SECRET_KEY'] = config['SECRET_KEY']

    #note - this should be strict when this is properly deployed
    #but I think setting this to Lax is the only thing that's going to work
    #until HTTPS is set up
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

    all_blueprints = [
        bp_front_end_views,
        bp_test_endpoints,
        bp_signature_endpoints,
        bp_petition_endpoints,
        bp_petition_group_endpoints,
        bp_user_endpoints,
        bp_member_endpoints,
        bp_login_endpoints,
        bp_validation_endpoints
    ]

    for bp in all_blueprints:
        app.register_blueprint(bp)

    init_db(app, config)
    init_email(app)
    return app

app = init_app()
