import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainNavbar from './MainNavbar';

function BookingPage() {
    const { hotelName, rating } = useParams();
    const navigate = useNavigate();
    const [dates, setDates] = useState({ start: '', end: '' });
    const [guests, setGuests] = useState(1);
    const [fare, setFare] = useState(null);

    const handleDateChange = (event) => {
        setDates({ ...dates, [event.target.name]: event.target.value });
    };

    const handleGuestChange = (event) => {
        setGuests(event.target.value);
    };

    const calculateFare = () => {
        // if rating is undefined, set it to 3
        if (!rating) {
            rating = 3;
        }
        if (dates.start && dates.end && guests) {
            const startDate = new Date(dates.start);
            const endDate = new Date(dates.end);
            const days = (endDate - startDate) / (1000 * 3600 * 24);
            if (days >= 0) {
                const calculatedFare = days * rating * 500 * guests;
                setFare(calculatedFare);
            } else {
                alert("Check-out date must be after check-in date.");
            }
        } else {
            alert("Please enter valid dates and number of guests.");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (fare !== null) {
            navigate('/payment', { state: { hotelName, rating, dates, guests, fare } });
        } else {
            alert("Please calculate the fare first.");
        }
    };

    return (
        <div>
            <MainNavbar />
            <div style={{
                padding: '20px',
                maxWidth: '600px',
                margin: '70px auto',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <h1>Book Your Stay at {decodeURIComponent(hotelName)}</h1>
                <p>Rating: {rating} stars</p>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Check-in Date:
                            <input type="date" name="start" value={dates.start} onChange={handleDateChange} style={{ marginLeft: '10px' }} />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Check-out Date:
                            <input type="date" name="end" value={dates.end} onChange={handleDateChange} style={{ marginLeft: '10px' }} />
                        </label>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Number of Guests:
                            <input type="number" value={guests} onChange={handleGuestChange} min="1" style={{ marginLeft: '10px' }} />
                        </label>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <button type="button" onClick={calculateFare} style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}>
                            Calculate Fare
                        </button>
                        {fare !== null && <span style={{ marginLeft: '20px' }}>Estimated Fare: ₹{fare.toFixed(2)}</span>}
                    </div>
                    <button type="submit" style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}>
                        Proceed to Payment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookingPage;
