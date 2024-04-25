from app import db
import requests


class Subscriber(db.Model):
    __tablename__ = "subscribers"

    user_id = db.Column(db.String(255), primary_key=True)
    destination = db.Column(db.String(255), nullable=False)
    weather = db.Column(db.String(1000))

    def update(self):
        try:
            response = requests.get(
                f"https://www.meteosource.com/api/v1/free/point?place_id={self.destination}&sections=current&timezone=auto&language=en&units=auto&key=6aui4vgiqcq9wfgbmit1u1357n6f3si08je5mus3"
            )
            if response.ok:
                data = response.json()
                print(data.get("current"))
                current_weather = data.get("current")
                if current_weather:
                    self.weather = current_weather
                    db.session.commit()
            else:
                print(
                    f"Failed to fetch weather data for subscriber {self.user_id}. Status code: {response.status_code}"
                )
        except Exception as e:
            print(
                f"Error updating weather data for subscriber {self.user_id}: {str(e)}"
            )
