import React, { useState, useEffect } from 'react';
import MainNavbar from './MainNavbar';
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap'; // Assuming you're using Reactstrap for styling

function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5006/bookings/' + localStorage.getItem("ID"));
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <MainNavbar />
            <div style={{margin:"40px"}}>
                <h1 style={{ marginTop: "70px" }}>My Bookings</h1>
                <div className="row">
                    {bookings.map((booking, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">{booking.hotelName}</CardTitle>
                                    <CardText>
                                        <strong>Start Date:</strong> {booking.startDate}<br />
                                        <strong>End Date:</strong> {booking.endDate}<br />
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyBookings;
