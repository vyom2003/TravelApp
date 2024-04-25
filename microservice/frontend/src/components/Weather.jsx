import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button, Form, Card } from 'react-bootstrap';
import MainNavbar from './MainNavbar';

const Weather = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [destination, setDestination] = useState('');

    useEffect(() => {
        checkSubscription();

        const interval = setInterval(() => {
            checkSubscription();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const checkSubscription = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5003/check_subscribed/' + localStorage.getItem("ID"));
            if (response.ok) {
                const data = await response.json();
                setSubscribed(data.subscribed);
                if (data.subscribed) {
                    const jsonStringWithDoubleQuotes = data.weather.replace(/'/g, '"');
                    const weatherData = JSON.parse(jsonStringWithDoubleQuotes);
                    setWeather(weatherData);
                    setDestination(data.location.charAt(0).toUpperCase() + data.location.slice(1))
                }
            } else {
                console.error('Failed to check subscription:', response.statusText);
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
        }
    };

    const handleSubscribe = async () => {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem("ID"));
        formData.append('destination', location.toLowerCase());

        try {
            const response = await fetch('http://127.0.0.1:5003/add_or_remove_subscriber', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setSubscribed(!subscribed);
                window.location.reload();
            } else {
                console.error('Failed to subscribe:', response.statusText);
            }
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    return (
        <div>
            <MainNavbar />
            <Container style={{ marginTop: "70px" }}>
                {weather && (
                    <Card className="shadow p-3 mb-5 bg-body rounded" style={{ marginTop: "20px" }}>
                        <Card.Body>
                            <Card.Title className="text-center">Weather Information for {destination}</Card.Title>
                            <div className="weather-info">
                                <div className="weather-info-item">
                                    <span className="font-weight-bold">Summary:</span> {weather.summary}
                                </div>
                                <div className="weather-info-item">
                                    <span className="font-weight-bold">Temperature:</span> {weather.temperature}
                                </div>
                                <div className="weather-info-item">
                                    <span className="font-weight-bold">Wind Speed:</span> {weather.wind.speed}
                                </div>
                                <div className="weather-info-item">
                                    <span className="font-weight-bold">Precipitation:</span> {weather.precipitation.total}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                )}

                {!subscribed ?
                    <>
                        <h1>Subscribe to our Weather Updates!!</h1>
                        <h4>Enter Destination</h4>
                    </>
                    : null}
                <Form>
                    {!subscribed ? <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Control type="text" placeholder="Enter location" value={location} onChange={handleLocationChange} />
                    </Form.Group> : null}
                    <Button variant={subscribed ? "danger" : "success"} onClick={handleSubscribe}>
                        {subscribed ? "Unsubscribe" : "Subscribe"}
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Weather;
