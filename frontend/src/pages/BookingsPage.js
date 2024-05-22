import React, { useState, useEffect } from "react";
import { getBookings, deleteBooking } from "../APICalls";
import { useAuth } from "../contexts/AuthContext";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    getBookings()
      .then((resp) => {
        setBookings(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (bookingId) => {
    deleteBooking(bookingId)
      .then((resp) => {
        console.log(resp);
        // Update bookings state after successful deletion
        setBookings(bookings.filter((booking) => booking[0] !== bookingId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="pageContainer">
      <h1>Bookings</h1>
      <p>A list of all reservations</p>

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Name</th>
              <th>Reserved By</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Remarks</th>
              {isLoggedIn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking[0]}>
                <td>{booking[0]}</td>
                <td>{booking[2]}</td>
                <td>{booking[3]}</td>
                <td>{booking[4]}</td>
                <td>{booking[5]}</td>
                <td>{booking[6]}</td>
                {isLoggedIn && (
                  <td>
                    <button onClick={() => handleDelete(booking[0])}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingsPage;
