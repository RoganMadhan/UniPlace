import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './styles/Global.css';  // Ensure this path is correct
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/bookings';
import Rooms from './pages/rooms';
import Navigation from './components/Navigation';
import BookingForm from './pages/BookingForm';

function App() {
  return (
    <Router>
      <div>
      <Navigation />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
