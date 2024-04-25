from app import db

class UPI(db.Model):
    __tablename__ = 'UpiDetails'
    upi_id = db.Column(db.String(30), primary_key=True)
    pin = db.Column(db.Integer,nullable= False)