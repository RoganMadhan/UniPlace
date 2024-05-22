export const BACKEND_URL = "http://localhost:5000";

export const getRooms = () => {
  return fetch(`${BACKEND_URL}/rooms`, {
    method: "GET",
  }).then((resp) => resp.json());
};

export const getBookings = () => {
  return fetch(`${BACKEND_URL}/bookings`, {
    method: "GET",
  }).then((resp) => resp.json());
};

export const addBooking = (booking) => {
  return fetch(`${BACKEND_URL}/add_booking`, {
    method: "POST",
    body: JSON.stringify({
      room_id: booking.room_id,
      reserved_by: booking.reserved_by,
      start_datetime: booking.start_datetime,
      end_datetime: booking.end_datetime,
      remarks: booking.remarks,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
};

export const addRoom = (room) => {
  return fetch(`${BACKEND_URL}/add_room`, {
    method: "POST",
    body: JSON.stringify({
      name: room.name,
      location: room.location,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
};

export const deleteRoom = (room_id) => {
  return fetch(`${BACKEND_URL}/delete_room`, {
    method: "DELETE",
    body: JSON.stringify({
      room_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
};

export const deleteBooking = (booking_id) => {
  return fetch(`${BACKEND_URL}/delete_booking`, {
    method: "DELETE",
    body: JSON.stringify({
      booking_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
};
