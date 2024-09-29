// worker.js
const db = require('./utils/db'); // Assuming you have a db.js file in utils

// Example function to perform a task
const performTask = async () => {
    try {
        // Simulate some work (e.g., processing data)
        const data = { key: 'value' };
        
        // Store data in Redis
        await db.set('some_key', JSON.stringify(data), 'EX', 60); // Expires in 60 seconds
        
        console.log('Data stored in Redis:', data);
    } catch (err) {
        console.error('Error in worker:', err);
    }
};

// Execute the task
performTask();