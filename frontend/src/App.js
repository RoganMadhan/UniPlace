import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import BookingForm from "./pages/BookingForm";
import BookingsPage from "./pages/BookingsPage";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import RoomsPage from "./pages/RoomsPage";
import LoginPage from "./pages/LoginPage";
import "./styles/Global.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
