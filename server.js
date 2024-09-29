const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'sql7.freesqldatabase.com',
    user: 'sql7734148',
    password: 'GPNbUSYqys',
    database: 'sql7734148', // This should be your actual database name
    port: 3306,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Database connected successfully!');
});

// Example route
app.get('/api/test', (req, res) => {
    res.send('API is working!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
