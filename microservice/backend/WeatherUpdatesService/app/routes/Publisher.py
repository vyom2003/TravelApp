from flask import request, jsonify, session
from app import app, db
from app.models.SubscriberModel import Subscriber
from flask import request
import time
import threading


@app.route("/add_or_remove_subscriber", methods=["POST"])
def add_or_remove_subscriber():
    try:
        print(request.form)
        user_id = request.form.get("user_id")
        destination = request.form.get("destination")

        existing_subscriber = Subscriber.query.filter_by(user_id=user_id).first()

        if existing_subscriber:
            db.session.delete(existing_subscriber)
            db.session.commit()
            return (
                jsonify(
                    {"message": f"Subscriber with user_id {user_id} removed successfully"}
                ),
                200,
            )
        else:
            if not user_id or not destination:
                return jsonify({"error": "Missing user_id or destination"}), 400
            new_subscriber = Subscriber(
                user_id=user_id, destination=destination, weather=""
            )
            db.session.add(new_subscriber)
            db.session.commit()
            new_subscriber.update()
            return (
                jsonify(
                    {"message": f"Subscriber with user_id {user_id} added successfully"}
                ),
                200,
            )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/check_subscribed/<user_id>", methods=["GET"])
def check_subscribed(user_id):
    try:
        subscriber = Subscriber.query.filter_by(user_id=user_id).first()
        if subscriber:
            return jsonify({"subscribed": True, "weather": subscriber.weather, "location": subscriber.destination}), 200
        else:
            return jsonify({"subscribed": False}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def run_notification_thread():
    while True:
        with app.app_context():
            try:
                session = db.session()

                # Query all subscribers and update
                subscribers = session.query(Subscriber).all()
                for subscriber in subscribers:
                    subscriber.update()

                # Close the session
                session.close()

            except Exception as e:
                print(f"Error in notification thread: {str(e)}")

        time.sleep(3600)


notification_thread = threading.Thread(target=run_notification_thread)
notification_thread.daemon = True
notification_thread.start()
