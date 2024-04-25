import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TravelItinerary from './components/TravelItinerary';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/travel" element={<TravelItinerary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
