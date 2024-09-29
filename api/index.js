const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7734148',
  password: 'GPNbUSYqys',
  database: 'sacco_db',
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

// Example endpoint
app.get('/api/your-endpoint', (req, res) => {
  res.send('Hello from the API!');
});

module.exports = app;
