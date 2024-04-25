from flask import request, jsonify, session
import requests
from app import app, db
from app.models.PartnerModel import Partner
import uuid
from flask import request

@app.route('/search', methods=['POST'])
def search_partner():
    user_id = request.form.get('userId')
    location = request.form.get('location')
    month = request.form.get('month')

    # Check if the partner already exists
    existing_partner = Partner.query.filter_by(user_id=user_id, destination=location, month=month).first()

    if existing_partner:
        # If partner exists, retrieve partner details from the database
        partners = Partner.query.filter_by(destination=location, month=month).all()
    else:
        # If partner doesn't exist, add new partner to the database
        partner = Partner(user_id=user_id, destination=location, month=month)
        db.session.add(partner)
        db.session.commit()
        # Retrieve all partners for the given location and month
        partners = Partner.query.filter_by(destination=location, month=month).all()

    # Get user details for all partners using another service
    partner_details = []
    for partner in partners:
        # Make HTTP request to the other service to get user details
        response = requests.get(f'http://127.0.0.1:5000/user/{partner.user_id}')
        if response.status_code == 200:
            user_details = response.json()
            partner_details.append(user_details)

    return jsonify({'partners': partner_details})