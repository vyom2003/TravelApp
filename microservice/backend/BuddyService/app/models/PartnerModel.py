from app import db


class Partner(db.Model):
    __tablename__ = 'partners'
    
    user_id = db.Column(db.String(36), primary_key=True)
    destination = db.Column(db.String(36),nullable=False)
    month = db.Column(db.String(36),nullable=False)