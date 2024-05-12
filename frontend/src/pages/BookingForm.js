import React, { useState, useEffect } from "react";
import styles from "../styles/booking.css"; // Assuming CSS modules are properly configured
import axios from "axios";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import default react-calendar styles

function BookingForm() {
  const [booking, setBooking] = useState({
    room_id: "",
    reserved_by: "",
    start_datetime: "",
    end_datetime: "",
    remarks: "",
  });
  const [rooms, setRooms] = useState([]); // State to hold rooms data
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to manage selected date

  useEffect(() => {
    fetchRoomIds();
  }, []); // Fetch rooms when component mounts

  const fetchRoomIds = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get_room_ids");
      setRooms(response.data); // Store fetched rooms in state
    } catch (error) {
      console.error("Failed to fetch room ids:", error);
      alert("Failed to fetch room ids");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("bookings", JSON.stringify(booking));
    alert("Booking saved!");
    resetForm();
  };

  const resetForm = () => {
    setBooking({
      room_id: "",
      reserved_by: "",
      start_datetime: "",
      end_datetime: "",
      remarks: "",
    });
  };

  return (
    <div className="container">
      <div className="calendarContainer">
        <div className="calendarWrapper">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      </div>
      <div className="bookingFormContainer">
        <h1 className="header">Booking Form</h1>
        <form onSubmit={handleSubmit} id="bookingForm">
          <label htmlFor="room">Room:</label>
          <select
            id="room"
            name="room_id"
            value={booking.room_id}
            onChange={handleChange}
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.room_id} value={room.room_id}>
                Room {room.room_id}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="reserved_by">Reserved By:</label>
          <input
            type="text"
            id="reserved_by"
            name="reserved_by"
            value={booking.reserved_by}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="start_datetime">Start Date/Time:</label>
          <input
            type="datetime-local"
            id="start_datetime"
            name="start_datetime"
            value={booking.start_datetime}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="end_datetime">End Date/Time:</label>
          <input
            type="datetime-local"
            id="end_datetime"
            name="end_datetime"
            value={booking.end_datetime}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            name="remarks"
            value={booking.remarks}
            onChange={handleChange}
          ></textarea>
          <br />
          <button className="myButton"  type="submit">Save</button>
          <button className="myButton"  type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
