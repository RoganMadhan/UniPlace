import React, { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import default react-calendar styles
import { addBooking, getRooms } from "../APICalls";
import styles from "../styles/booking.css";

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
  const [errors, setErrors] = useState({}); // State to manage validation errors

  useEffect(() => {
    getRooms()
      .then((resp) => {
        setRooms(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // Fetch rooms when component mounts

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

  const validateForm = () => {
    let formErrors = {};
    if (!booking.room_id) formErrors.room_id = "Room is required";
    if (!booking.reserved_by)
      formErrors.reserved_by = "Reserved By is required";
    if (!booking.start_datetime)
      formErrors.start_datetime = "Start Date/Time is required";
    if (!booking.end_datetime)
      formErrors.end_datetime = "End Date/Time is required";
    return formErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Booking Details:", booking);

      addBooking(booking)
        .then((resp) => {
          console.log(resp);
          alert(resp.message);
          if (resp.message.includes('successfully')){
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else {
      setErrors(formErrors);
    }
  };

  const resetForm = () => {
    setBooking({
      room_id: "",
      reserved_by: "",
      start_datetime: "",
      end_datetime: "",
      remarks: "",
    });
    setErrors({});
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
              <option key={room[0]} value={room[0]}>
                {room[1]}
              </option>
            ))}
          </select>
          {errors.room_id && <span className="error">{errors.room_id}</span>}
          <br />
          <label htmlFor="reserved_by">Reserved By:</label>
          <input
            type="text"
            id="reserved_by"
            name="reserved_by"
            value={booking.reserved_by}
            onChange={handleChange}
          />
          {errors.reserved_by && (
            <span className="error">{errors.reserved_by}</span>
          )}
          <br />
          <label htmlFor="start_datetime">Start Date/Time:</label>
          <input
            type="datetime-local"
            id="start_datetime"
            name="start_datetime"
            value={booking.start_datetime}
            onChange={handleChange}
          />
          {errors.start_datetime && (
            <span className="error">{errors.start_datetime}</span>
          )}
          <br />
          <label htmlFor="end_datetime">End Date/Time:</label>
          <input
            type="datetime-local"
            id="end_datetime"
            name="end_datetime"
            value={booking.end_datetime}
            onChange={handleChange}
          />
          {errors.end_datetime && (
            <span className="error">{errors.end_datetime}</span>
          )}
          <br />
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            name="remarks"
            value={booking.remarks}
            onChange={handleChange}
          ></textarea>
          <br />
          <button className="myButton" type="submit">
            Save
          </button>
          <button className="myButton" type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
