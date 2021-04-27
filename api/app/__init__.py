from flask import Flask, request, jsonify

#init flask app
app = Flask(__name__, static_folder='../../build', static_url_path='/')

from app import database as db
db.connect()

#routes
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/get_cities', methods=["GET"])
def get_cities():
    all_cities = db.get_all_cities()
    return jsonify([ { 'id' : city.id, 'name' : city.name } for city in all_cities])

@app.route('/api/add_city', methods=["POST"])
def add_city():
    city_name = request.json['newCityName']
    print(f"city_name: {city_name}")
    new_city = db.add_city(city_name)
    return jsonify({ 'id' : new_city.id, 'name' : new_city.name })
    