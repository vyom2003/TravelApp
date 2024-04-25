from flask import request, jsonify
from app import app
from app.models.UserModel import User
from app.dao.UserDao import UserDao

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.form
        if data:
            email = data["email"]
            password = data["password"]
            if email and password:
                user = UserDao.get_user_by_email(email)
                if user and UserDao.verify_password(user.password, password.strip()):
                    return jsonify({"message": "Login successful", "id": user.getId(), "status": "success"})
                else:
                    return jsonify({"message": "Invalid email or password", "status": "error"})
            else:
                return jsonify({"message": "Email and password are required", "status": "error"})
        else:
            return jsonify({"message": "Invalid form data", "status": "error"})
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"message": "An error occurred", "status": "error"})

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.form
        if data:
            email = data["email"]
            password = data["password"]
            name = data["name"]
            phone_no = data["phone_no"]
            result = UserDao.register_user(email, password, name, phone_no)
            return result
        else:
            return jsonify({"message": "Invalid form data", "status": "error"})
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"message": "An error occurred", "status": "error"})

@app.route('/user/<string:userid>', methods=['GET'])
def get_user_details(userid):
    user = UserDao.get_user_by_id(userid)
    if user:
        user_details = {
            'userid': user.userid,
            'name': user.name,
            'email': user.email,
            'phone_no': user.phone_no
        }
        return jsonify(user_details)
    else:
        return jsonify({'error': 'User not found'}), 404
