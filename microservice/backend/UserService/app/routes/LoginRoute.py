from flask import request, jsonify, session
from app import app, db
from app.models.UserModel import User
import uuid
from werkzeug.security import generate_password_hash, check_password_hash

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.form  # Read form data from request body
        if data:
            email = data["email"]
            password = data["password"]
            if email and password:
                print(email)
                user = User.query.filter_by(email=email).first()
                print(user.password)
                print(password)
                print(check_password_hash(user.password, password.strip()))
                if user and check_password_hash(user.password, password.strip()):
                    return jsonify({"message": "Login successful", "id": user.getId(), "status": "success"})
                else:
                    return jsonify({"message": "Invalid email or password", "status": "error"})
            else:
                return jsonify({"message": "Email and password are required", "status": "error"})
        else:
            return jsonify({"message": "Invalid form data", "status": "error"})
    except Exception as e:
        print("Error occurred:", e)  # Print any errors that occur
        return jsonify({"message": "An error occurred", "status": "error"})

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.form
        print(data)  # Read form data from request body
        if data:
            email = data["email"]
            password = data["password"]
            name = data["name"]
            phone_no = data["phone_no"]
            if len(password) < 8:
                return jsonify({"message": "Password must be at least 8 characters", "status": "error"}), 400
            if len(phone_no) != 10:
                return jsonify({"message": "Phone number must be 10 digits", "status": "error"}), 400   
            if not email or not "@" in email or not "." in email:
                return jsonify({"message": "Invalid email", "status": "error"}), 400

            if not all([email, password, name, phone_no]):
                return jsonify({"message": "All fields are required", "status": "error"}), 400

            if User.query.filter_by(email=email).first():
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

        else:
            return jsonify({"message": "Invalid form data", "status": "error"})
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"message": "An error occurred", "status": "error"})
