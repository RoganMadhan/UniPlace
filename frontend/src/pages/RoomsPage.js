import React, { useState, useEffect } from "react";
import { getRooms, deleteRoom, addRoom } from "../APICalls";
import { useAuth } from "../contexts/AuthContext";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [location, setLocation] = useState("");
  const { isLoggedIn } = useAuth();

  const resetForm = () => {
    setRoomName("");
    setLocation("");
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms=()=>{
    getRooms()
    .then((resp) => {
      setRooms(resp);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const handleDelete = (roomId) => {
    deleteRoom(roomId)
      .then((resp) => {
        console.log(resp);
        // Update rooms state after successful deletion
        setRooms(rooms.filter((room) => room[0] !== roomId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    const room = { name: roomName, location };
    addRoom(room)
      .then((resp) => {
        console.log(resp);
        alert(resp.message);
        if (resp.message.includes("successfully")) {
          resetForm();
          // Update rooms state after successful addition
          fetchRooms();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const isFormValid = roomName.trim() !== "" && location.trim() !== "";

  return (
    <div className="pageContainer">
      <h1>Rooms/Desks</h1>
      <p>A list of all available rooms/desks</p>

      {isLoggedIn && (
        <form onSubmit={handleAddRoom}>
          <div>
            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit" disabled={!isFormValid}>
            Add Room
          </button>
        </form>
      )}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Name</th>
              <th>Location</th>
              {isLoggedIn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room[0]}>
                <td>{room[0]}</td>
                <td>{room[1]}</td>
                <td>{room[2]}</td>
                {isLoggedIn && (
                  <td>
                    <button onClick={() => handleDelete(room[0])}>
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

export default RoomsPage;