from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'rogan2206'
app.config['MYSQL_DB'] = 'uniplacedb'

mysql = MySQL(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test_db')
def test_db():
    """Test database connection"""
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT 1")
        cur.close()
        return 'Database connection test passed'
    except Exception as e:
        return f'Database connection test failed: {str(e)}'

@app.route('/submit', methods=['POST'])
def handle_data():
    """Handle data submission"""
    data = request.get_json()
    print(data)
    return jsonify({"status": "success", "message": "Data received successfully"}), 200

@app.route('/rooms')
def get_all_rooms():
    """Get all room details"""
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM rooms")
    if result > 0:
        room_details = cur.fetchall()
        cur.close()
        return jsonify(room_details)
    cur.close()
    return 'No rooms found'


@app.route('/bookings_count')
def get_all_bookings_count():
    """Get all booking details"""
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT COUNT(*) FROM bookings")
    if result > 0:
        booking_details = cur.fetchall()
        cur.close()
        return jsonify(booking_details)
    cur.close()
    return 'No bookings found'

@app.route('/get_room_names', methods=['GET'])
def get_room_names():
    """Get names of all rooms"""
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT name FROM uniplacedb.rooms")
        room_names = cur.fetchall()
        cur.close()
        return jsonify(room_names)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add_room', methods=['POST'])
def add_room():
    """Add a new room"""
    data = request.get_json()
    name = data['name']
    location = data['location']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO rooms(name, location) VALUES (%s, %s)", (name, location))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Room added successfully"}), 201

@app.route('/delete_room', methods=['DELETE'])
def delete_room():
    """Delete a room by ID"""
    data = request.get_json()
    room_id = data['room_id']
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM rooms WHERE id = %s", [room_id])
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Booking deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/bookings')
def get_all_bookings():
    """Get all booking details"""
    try:
        cur = mysql.connection.cursor()
        query = """
        SELECT b.id, b.room_id, r.name as room_name, b.reserved_by, b.start_datetime, b.end_datetime, b.remarks
        FROM bookings b
        JOIN rooms r ON b.room_id = r.id
        """
        result = cur.execute(query)
        if result > 0:
            booking_details = cur.fetchall()
            cur.close()
            return jsonify(booking_details)
        cur.close()
        return jsonify([])  # Return an empty list if no bookings are found
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add_booking', methods=['POST'])
def add_booking():
    """Add a new booking with validation to prevent double-booking"""
    data = request.get_json()
    room_id = data['room_id']
    reserved_by = data['reserved_by']
    start_datetime = data['start_datetime']
    end_datetime = data['end_datetime']
    remarks = data['remarks']
    
    try:
        cur = mysql.connection.cursor()
        
        # Check if the room is already booked during the requested time period
        cur.execute("""
            SELECT * FROM bookings 
            WHERE room_id = %s AND (
                (start_datetime <= %s AND end_datetime >= %s) OR
                (start_datetime <= %s AND end_datetime >= %s) OR
                (start_datetime >= %s AND end_datetime <= %s)
            )
            """, (room_id, start_datetime, start_datetime, end_datetime, end_datetime, start_datetime, end_datetime))
        
        existing_bookings = cur.fetchall()
        
        if existing_bookings:
            cur.close()
            return jsonify({"message": "Room is already booked during the requested time period"}), 409
        
        # Proceed to add the booking if no conflicts are found
        cur.execute("""
            INSERT INTO bookings (room_id, reserved_by, start_datetime, end_datetime, remarks)
            VALUES (%s, %s, %s, %s, %s)
            """, (room_id, reserved_by, start_datetime, end_datetime, remarks))
        
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Booking added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_booking', methods=['DELETE'])
def delete_booking():
    """Delete a booking by ID"""
    data = request.get_json()
    booking_id = data['booking_id']
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM bookings WHERE id = %s", [booking_id])
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Booking deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
