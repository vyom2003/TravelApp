from flask import request, jsonify
from app import app
import google.generativeai as genai 
import re

GOOGLE_API_KEY = "AIzaSyBVBEV3LEdemFIPX2Ot-xcfK2j_QdrJyU4"

def markdown_to_html(text):
    # Replace Markdown bold with HTML bold
    return re.sub(r'\*\*(.*?)\*\*', r'<br><strong>\1</strong><br>', text)

@app.route('/travel', methods=['POST'])
def generateItinerary():
    if request.method == 'POST':
        try:
            destination = request.form.get('destination')
            start_date = request.form.get('start_date')
            end_date = request.form.get('end_date')
            interests = request.form.get('interests')
            additional_notes = request.form.get('additional_notes')
            
            # Constructing the prompt for the itinerary generation
            prompt = f"I am planning a trip to {destination} from {start_date} to {end_date}.\n"\
                    f"Interests: {interests}\n"\
                    f"Notes: {additional_notes} make an itinerary for me\n"
            print(prompt)
            
            genai.configure(api_key=GOOGLE_API_KEY)
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(prompt)
            html_response = markdown_to_html(response.text)
            
            return jsonify({"answer": html_response})
        except Exception as e:
            # Handling general errors
            return jsonify({"error": "An error occurred: " + str(e)}), 500
    else:
        return 'Invalid HTTP method'
