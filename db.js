const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'sql7.freesqldatabase.com', // Replace with your host
  user: 'sql7734148',               // Replace with your database username
  password: 'GPNbUSYqys',   // Replace with your database password
  database: 'sql7734148',           // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// Export the connection for use in other modules
module.exports = connection;
