from flask import Blueprint, request, jsonify
from app import app,db
from app.models.BookingModel import Booking

@app.route('/bookings', methods=['POST'])
def create_booking():
    try:
        booking_data = request.get_json()
        user_id = booking_data.get('user_id')
        hotel_name = booking_data.get('hotel_name')
        start_date = booking_data.get('start_date')
        end_date = booking_data.get('end_date')

        existing_booking = Booking.query.filter_by(user_id=user_id, hotelName=hotel_name, startDate=start_date, endDate=end_date).first()

        if existing_booking:
            return jsonify({'message': 'Booking already exists with the same details', "status": 400})

        new_booking = Booking(user_id=user_id, hotelName=hotel_name, startDate=start_date, endDate=end_date)
        db.session.add(new_booking)
        db.session.commit()

        return jsonify({'message': 'Booking created successfully', "status": 200})

    except Exception as e:
        return jsonify({'message': str(e), "status": 500})


@app.route('/bookings/<user_id>', methods=['GET'])
def get_user_bookings(user_id):
    try:
        # Query bookings for the specified user_id
        user_bookings = Booking.query.filter_by(user_id=user_id).all()

        # Serialize the bookings data
        bookings_data = []
        for booking in user_bookings:
            booking_data = {
                'booking_id': booking.booking_id,
                'user_id': booking.user_id,
                'hotelName': booking.hotelName,
                'startDate': booking.startDate,
                'endDate': booking.endDate
            }
            bookings_data.append(booking_data)

        return jsonify(bookings_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
