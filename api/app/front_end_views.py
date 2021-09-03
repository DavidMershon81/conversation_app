from flask import Blueprint

bp_front_end_views = Blueprint('front_end_views', __name__, static_folder='../../build', static_url_path='/')

#front end routes (serves static react content)
@bp_front_end_views.route('/')
def index():
    return bp_front_end_views.send_static_file('index.html')

@bp_front_end_views.errorhandler(404)
def not_found(e):
    return bp_front_end_views.send_static_file('index.html')