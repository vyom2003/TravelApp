from flask import  jsonify
from app import app
from app.models.UserModel import User

@app.route('/user/<string:userid>', methods=['GET'])
def get_user_details(userid):
    user = User.query.get(userid)
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