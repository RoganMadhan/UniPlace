import React from 'react';
import styles from '../styles/Homepage.css';

function Homepage() {
  return (
    <div className="homepage">
      <div className="container">
        <h1 className="title">Welcome to UniPlace</h1>
        <h2 className="subtitle">Your Premier Room and Desk Scheduling Solution</h2>
        <p className="description">
          At UniPlace, we understand the importance of efficiency and organization in the modern workspace. That's why we're proud to introduce UniPlace, your all-in-one solution for room and desk scheduling in office environments.
        </p>
        <p className="description">
          UniPlace revolutionizes the way teams manage their workspace by providing a seamless platform for booking large spaces within an office. Whether you're coordinating meetings, workshops, or collaborative sessions, UniPlace simplifies the process, ensuring that every space in your office is utilized effectively.
        </p>
      </div>
    </div>
  );
}

export default Homepage;
