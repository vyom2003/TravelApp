from .CreditCardStrategy import CreditCardStrategy
from .UpiStrategy import UpiStrategy
class PaymentResource:
    def __init__(self, payment_method,data):
        if(payment_method=="Card"):
            self.payment_strategy = CreditCardStrategy(data)
        elif(payment_method=="UPI"):
            self.payment_strategy = UpiStrategy(data)

    def make_payment(self, amount):
        return self.payment_strategy.pay(amount)
