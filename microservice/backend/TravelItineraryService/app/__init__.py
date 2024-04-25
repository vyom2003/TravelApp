from flask import Flask
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS
# Create Flask app instance
app = Flask(__name__)
CORS(app)
from app.routes.TravelItineraryRoute import generateItinerary