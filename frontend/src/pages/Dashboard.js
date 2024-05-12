import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "../styles/Dashboard.css"; // Ensure your CSS module is configured correctly

function Dashboard() {
  const [inputValue, setInputValue] = useState(""); // State to keep track of input

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state with input value
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Submitted value:", inputValue); // Here you might handle the value, e.g., sending it to an API
  };

  return (
    <div className="pageContainer">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <div className="cardContainer">
        {/* Link to navigate to the rooms page */}
        <Link to="/rooms" className="card">
          <h2>Room/Desk</h2>
          <p>4 available rooms/desks</p>
        </Link>
        <div className="card">
          <h2>All Reservations</h2>
          <p>8 reservations</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
