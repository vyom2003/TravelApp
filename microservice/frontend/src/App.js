import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TravelItinerary from './components/TravelItinerary';
import TravelBuddy from './components/TravelBuddy';
import Weather from './components/Weather';
import HotelRegister from './components/HotelRegister';
import BookingPage from './components/BookingPage';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';
import FailurePage from './components/FailurePage';
import MyBookings from './components/MyBookings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/travel" element={<TravelItinerary />} />
          <Route path="/buddy" element={<TravelBuddy />} />
          <Route path="/weather" element={<Weather/>} />
          <Route path="/hotel-register" element={<HotelRegister/>}/>
          <Route path="/booking/:hotelName/:rating" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<FailurePage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
