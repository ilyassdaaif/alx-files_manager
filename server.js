// server.js
const express = require('express');
const db = require('./utils/db'); // Assuming you have a db.js file in utils
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get('/data', (req, res) => {
    // Example: Fetching data from Redis
    db.get('some_key', (err, result) => {
        if (err) {
            console.error('Error fetching from Redis:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result) {
            return res.json({ data: JSON.parse(result) });
        } else {
            // Example: If no data is found, return a default response
            return res.json({ data: 'No data found' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});