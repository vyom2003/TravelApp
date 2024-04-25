from enum import Enum
from app import db

class User(db.Model):
    __tablename__ = 'users'
    
    userid = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_no = db.Column(db.String(15), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def check_password(self, password):
        return True if password == self.password else False
    
    def getId(self):
        return self.userid