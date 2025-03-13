from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

CORS(api, resources={r"/*": {"origins": "*"}})

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hello! Backend is working!"}), 200

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not all([data.get("email"), data.get("password"), data.get("firstname"), 
                data.get("lastname"), data.get("security_question"), data.get("security_answer")]):
        return jsonify({"error": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 409

    new_user = User(
        email=data["email"],
        firstname=data["firstname"],
        lastname=data["lastname"],
        password=data["password"],
        security_question=data["security_question"],
        security_answer=data["security_answer"]
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "message": "User registered successfully",
        "token": access_token,
        "user": new_user.serialize()
    }), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and Password are required"}), 400

    user = User.query.filter_by(email=data.get("email")).first()
    if user and user.check_password(data["password"]):
        access_token = create_access_token(identity=user.id)
        return jsonify({"message": "Login successful", "token": access_token, "user": user.serialize()}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@api.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()

    email = data.get("email")
    question = data.get("security_question")
    answer = data.get("security_answer")
    new_password = data.get("new_password")

    if not all([email, question, answer, new_password]):
        return jsonify({"error": "All fields are required"}), 400

    user = User.query.filter_by(email=email, security_question=question, security_answer=answer).first()
    if not user:
        return jsonify({"error": "Security info does not match"}), 401

    user.password = new_password
    db.session.commit()

    return jsonify({"message": "Password has been reset"}), 200

@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"user": user.serialize()}), 200


