import React, { useState } from 'react';
import { Tab, Tabs, Form, Button, Card } from 'react-bootstrap';
import MainNavbar from './MainNavbar';

function TravelPartnerPage() {
    const [location, setLocation] = useState('');
    const [month, setMonth] = useState('');
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('ID');

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('location', location.toLowerCase());
        formData.append('month', month.toLowerCase());

        try {
            const response = await fetch('http://127.0.0.1:5002/search', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setUsers(data.partners);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div style={{ padding: '20px' }}>
            <MainNavbar />

            <h1 style={{ marginTop: "70px" }}>Find a Travel Partner</h1>
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formMonth">
                    <Form.Label>Month</Form.Label>
                    <Form.Control type="text" placeholder="Enter month of travel" value={month} onChange={(e) => setMonth(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>Mark my Interest and Search</Button>
            </Form>
            <hr />
            <h2>Users with Similar Interests</h2>
            {users.map(user => (
                user.userid !== localStorage.getItem("ID") && (
                    <Card key={user}>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            Phone Number : {user.phone_no}<br />
                            Email : {user.email}<br /><br />
                        </Card.Body>
                    </Card>
                )
            ))}
        </div>
    );
}

export default TravelPartnerPage;
