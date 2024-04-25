from flask import Flask
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS
# Create Flask app instance
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:vyom2003@localhost/partner_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'shamster'

# Initialize SQLAlchemy with the Flask app
db = SQLAlchemy(app)
from app.routes import SearchRoute  # Import your routes here