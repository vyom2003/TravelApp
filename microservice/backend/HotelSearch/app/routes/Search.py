from flask import Flask, request, jsonify
from flask_cors import CORS
import requests  # for making external API requests
from app import app

API_URL = "https://test.api.amadeus.com/v1"
CLIENT_ID = 'FZ7wd036n7IiOiZ3fv3dEMQyTG1xAtY7'  # Replace with your actual client ID
CLIENT_SECRET = '8ttLDKpzYDptGeL3'  # Replace with your actual client secret

def get_external_access_token():
    """Fetch access token from external API."""
    token_url = f"{API_URL}/security/oauth2/token"
    details = {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }
    response = requests.post(token_url, data=details)
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        raise Exception("Failed to fetch access token")

@app.route('/get_token', methods=['POST'])
def get_token():
    """API endpoint to get access token."""
    try:
        token = get_external_access_token()
        return jsonify({"token": token})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/search_hotels', methods=['GET'])
def search_hotels():
    """API endpoint to search for hotels."""
    try:
        city_code = request.args.get('cityCode')
        radius = request.args.get('radius')
        radius_unit = request.args.get('radiusUnit')
        amenities = request.args.get('amenities')
        rating = request.args.get('rating')
        token = get_external_access_token()

        url = f"{API_URL}/reference-data/locations/hotels/by-city?cityCode={city_code}&radius={radius}&radiusUnit={radius_unit}"
        if amenities:
            url += f"&amenities={amenities}"
        if rating:
            url += f"&ratings={rating}"
        
        url += "&hotelSource=ALL"

        headers = {
            'Authorization': f'Bearer {token}',
            'Accept': 'application/vnd.amadeus+json'
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return jsonify(response.json()['data'])
        else:
            return jsonify({"error": "Failed to fetch hotels"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/find_city_code', methods=['POST'])
def find_city_code():
    """API endpoint to find city code based on city name."""
    try:
        city_name = request.json.get('cityName')
        country_code = request.json.get('countryCode', 'IN')
        token = get_external_access_token()
        url = f"{API_URL}/reference-data/locations/cities?countryCode={country_code}&keyword={city_name}&max=1"
        headers = {
            'Authorization': f'Bearer {token}',
            'Accept': 'application/vnd.amadeus+json'
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200 and response.json()['data']:
            return jsonify({"cityCode": response.json()['data'][0]['iataCode']})
        else:
            return jsonify({"error": "City code not found"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
