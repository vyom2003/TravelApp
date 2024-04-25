from app import db

class Booking(db.Model):
    __tablename__ = 'bookings'

    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(36), nullable=False)
    hotelName = db.Column(db.String(36), nullable=True)
    startDate = db.Column(db.String(10), nullable=True)
    endDate = db.Column(db.String(10), nullable=True)