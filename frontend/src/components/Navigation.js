import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navigation() {
  const location = useLocation();

  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">UniPlace</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/dashboard" className="navbar-item">
          Dashboard
        </Link>
        <Link to="/booking" className="navbar-item">
          Booking
        </Link>
        <Link to="/bookings" className="navbar-item">
          Bookings
        </Link>
        <Link to="/rooms" className="navbar-item">
          Rooms
        </Link>
      </div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <Link className="button" onClick={logout}>
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="button">
              Login
            </Link>
            <Link to="/signup" className="button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
    // <header className="header">
    //   <div className="logo">UniPlace</div>
    //   <ul className="nav">
    //     <li><Link to="/dashboard">Dashboard</Link></li>
    //     <li><Link to="/booking">Booking</Link></li>
    //     <li><Link to="/bookings">Bookings</Link></li>
    //     <li><Link to="/rooms">Rooms</Link></li>
    //   </ul>
    // </header>
  );
}

export default Navigation;
