
from flask_mysqldb import MySQL
from flask import Flask, request, jsonify
from flask_cors import CORS
#__name__ = '__main__'
app = Flask(__name__)

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost:3306'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'rogan2206'
app.config['MYSQL_DB'] = 'uniplacedb'

mysql = MySQL(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/submit', methods=['POST'])
def handle_data():
    data = request.get_json()  # Get data sent from the React app
    print(data)  # For debugging, print the data received

    # You can process the data here and return a response
    return jsonify({"status": "success", "message": "Data received successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
   
   
@app.route('/add_room', methods=['POST'])
def add_room():
    name = request.form['name']
    location = request.form['location']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO rooms(name, location) VALUES (%s, %s)", (name, location))
    mysql.connection.commit()
    cur.close()
    

@app.route('/rooms')
def rooms():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM rooms")
    if result > 0:
        room_details = cur.fetchall()
        return jsonify(room_details)
    cur.close()
    return 'No rooms found'

def test_db_connection():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT 1")  # Simple query to test the connection
        cur.close()
        print("Database connection test passed")
    except Exception as e:
        print(f"Database connection test failed: {str(e)}")
 
@app.route('/add_booking', methods=['POST'])
def add_booking():
    data = request.get_json()  # Get data from JSON body
    room_id = data['room_id']
    reserved_by = data['reserved_by']
    start_datetime = data['start_datetime']
    end_datetime = data['end_datetime']
    remarks = data['remarks']

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO bookings (room_id, reserved_by, start_datetime, end_datetime, remarks)
            VALUES (%s, %s, %s, %s, %s)
            """, (room_id, reserved_by, start_datetime, end_datetime, remarks))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Booking added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_room_ids', methods=['GET'])  # Changed to GET method
def get_room_ids():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT name FROM uniplacedb.rooms")
        room_ids = cur.fetchall()  # Fetch all room IDs
        cur.close()  # Ensure cursor is closed after operation
        print(jsonify(room_ids))
        return jsonify(room_ids)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
    