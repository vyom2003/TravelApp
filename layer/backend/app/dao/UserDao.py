from app import db
from app.models.UserModel import User
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from flask import request, jsonify

class UserDao:
    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_user_by_id(userid):
        return User.query.get(userid)

    @staticmethod
    def verify_password(hashed_password, password):
        return check_password_hash(hashed_password, password)

    @staticmethod
    def register_user(email, password, name, phone_no):
        if len(password) < 8:
            return jsonify({"message": "Password must be at least 8 characters", "status": "error"}), 400
        if len(phone_no) != 10:
            return jsonify({"message": "Phone number must be 10 digits", "status": "error"}), 400   
        if not email or not "@" in email or not "." in email:
            return jsonify({"message": "Invalid email", "status": "error"}), 400

        if not all([email, password, name, phone_no]):
            return jsonify({"message": "All fields are required", "status": "error"}), 400

        if UserDao.get_user_by_email(email):
            return jsonify({"message": "Email already registered. Please use a different email.", "status": "error"}), 409

        hashed_password = generate_password_hash(password.strip())
        new_user = User(
            userid=str(uuid.uuid4()),
            name=name,
            email=email,
            password=hashed_password,
            phone_no=phone_no
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registration successful! Please log in.", "status": "success"}), 201
