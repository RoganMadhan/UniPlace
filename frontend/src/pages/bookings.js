import React from 'react';

function bookings() {
  return (
    <div className='pageContainer'>
      <h1>Bookings</h1>
      <p>A list of all reservations</p>

      <div className="tableContainer">
        <table>
          <tr>
            <th>ID</th>
            <th>Room ID</th>
            <th>Reserved By</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Remarks</th>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>John Doe</td>
            <td>2023-01-01 10:00:00</td>
            <td>2023-01-01 12:00:00</td>
            <td>Monthly meeting</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Meeting Room B</td>
            <td>Second Floor</td>
            <td>Second Floor</td>
            <td>Second Floor</td>
            <td>Second Floor</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Conference Room B</td>
            <td>First Floor</td>
            <td>First Floor</td>
            <td>First Floor</td>
            <td>First Floor</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Meeting Room B</td>
            <td>Second Floor</td>
            <td>Second Floor</td>
            <td>Second Floor</td>
            <td>Second Floor</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default bookings;