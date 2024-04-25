from app import db

class CreditCard(db.Model):
    __tablename__ = 'CreditCard'
    card_number = db.Column(db.String(30), primary_key=True)
    cvv = db.Column(db.Integer, nullable=False)
    expiry = db.Column(db.String(10), nullable=False)