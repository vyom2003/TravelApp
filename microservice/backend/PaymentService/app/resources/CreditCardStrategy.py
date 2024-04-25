from .PaymentStrategy import PaymentStrategy
from flask import jsonify
from app import db
from app.models.CreditCard import CreditCard
import datetime

class CreditCardStrategy(PaymentStrategy):
    def __init__(self, data):
        self.data = data

    def pay(self, amount):
        # Assuming 'data' contains credit card credentials
        credit_card_number = self.data.get('cardNumber')
        cvv = self.data.get('cvv')
        expiry_date = self.data.get('expiryDate')
        expiry_date_obj = datetime.datetime.strptime(expiry_date, '%Y-%m')
        expiry_date_formatted = expiry_date_obj.strftime('%m %Y')
        print(credit_card_number)
        print(cvv)
        print(expiry_date_formatted)
        try:
            credit_card = CreditCard.query.filter_by(card_number=credit_card_number,
                                                     cvv=cvv,
                                                     expiry=expiry_date_formatted).first()

            if credit_card:
                response = {'message': f"Paid {amount} from Card","status":200}
            else:
                response = {'message': 'Incorrect credit card credentials',"status":400}

        except Exception as e:
            print("Error:", e)
            response = {'message': 'An error occurred while processing the payment',"status":400}

        # Convert the response to JSON and return
        return jsonify(response)
