from flask import json, request, jsonify
from app import app
from app import database as db

#front end routes (serves react content) //////////////////////////////////////////
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')