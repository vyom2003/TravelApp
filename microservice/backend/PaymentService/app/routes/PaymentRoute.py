from flask import request, jsonify
import requests
from app import app
from app.resources.PaymentResource import PaymentResource
@app.route('/pay', methods=['POST'])

def make_payment():
    try:
        if request.method == 'POST':
            form_data = request.form
            pay = PaymentResource(form_data.get("paymentMethod"),form_data)
            res = pay.make_payment(form_data.get("amount"))
            print(res.json)
            if(res.json.get("status")==200):
                booking_data = {
                    'user_id': form_data.get('user_id'),
                    'hotel_name': form_data.get('hotelName'),
                    'start_date': form_data.get('startDate'),
                    'end_date': form_data.get('endDate')
                }
                print(booking_data)
                return requests.post('http://127.0.0.1:5006/bookings', json=booking_data).json(), 200
            else:
                return jsonify({"message":f"Payment Failed {res.json}" }),400
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({"message":"Payment Failed"}),400