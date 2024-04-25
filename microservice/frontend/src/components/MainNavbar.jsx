import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function MainNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("ID");
        navigate("/");
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand as={Link} style={{ marginLeft: "30px" }}>Travel App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/travel">Travel Itinerary</Nav.Link>
                    <Nav.Link as={Link} to="/buddy">Travel Buddy</Nav.Link>
                    <Nav.Link as={Link} to="/weather">Weather Updates</Nav.Link>
                    <Nav.Link as={Link} to="/hotel-register">Hotel Booking</Nav.Link>
                    <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainNavbar;
