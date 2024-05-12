import React, { useState } from 'react';

function Dashboard() {
    const [inputValue, setInputValue] = useState(""); // State to keep track of the input field

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the state with the new input
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const data = { inputValue }; // Prepare the data as an object

        try {
            const response = await fetch('http://localhost:5000/submit', { // Adjust the URL to your Flask endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Response from server:', jsonResponse); // Handle the response data
            } else {
                throw new Error('Failed to send data');
            }
        } catch (error) {
            console.error('Error:', error); // Handle errors
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your text here"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Dashboard;
