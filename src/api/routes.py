"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager

jwt = JWTManager()
api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Registration Route
@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and Password are required"}), 400

    # Check if email already exists

    existing_user = User.query.filter_by(email=data["email"]).first()
    if exisiting_user:
        return jsonify({"error": "Email already registered"}), 409


    # Create and Save new user
    new_user = User(
        email=data["email"],
        firstname=data.get("firstname",""),
        lastname=data.get("lastname","")
    )
    new_user.password = data["pasword"]

    db.session.add(new_user)
    db.session.commit()

    return jsonify ({"message": "User registered successfully", "user": new_user.serialize()})

# User Login Route
@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and Password are required"}), 400

    user = User.query.filter_by(email=data.get("email")).first()

    # Check if user email and password are correctct
    if user and user.check_password(data["password"]):
        access_token = create_access_token(identity=user.id)
        return jsonify ({"message": "Login successful", "token": access_token}), 200

    return jsonify({"error": "Invalid credentials"}), 401
