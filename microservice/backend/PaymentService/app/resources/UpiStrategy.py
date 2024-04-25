from .PaymentStrategy import PaymentStrategy
from app.models.Upi import UPI
from flask import jsonify

class UpiStrategy(PaymentStrategy):
    def __init__(self, data):
        self.data = data

    def pay(self, amount):

        upi_id = self.data.get('upiId')
        pin = self.data.get('upiPin')
        upi_details = UPI.query.filter_by(upi_id=upi_id, pin=pin).first()

        if upi_details:
            res =  f"Paid {amount} via UPI"
            return jsonify({"message":res,"status":200})
        else:
            res =  "UPI payment failed: Incorrect UPI ID or PIN"
            return jsonify({"message":res,"status":400})

        
