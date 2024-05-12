import React from 'react';

function rooms() {
  return (
    <div className='pageContainer'>
      <h1>Rooms/Desks</h1>
      <p>A list of all available rooms/desks</p>

      <div className="tableContainer">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Conference Room A</td>
            <td>First Floor</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Meeting Room B</td>
            <td>Second Floor</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Conference Room B</td>
            <td>First Floor</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Meeting Room B</td>
            <td>Second Floor</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default rooms;