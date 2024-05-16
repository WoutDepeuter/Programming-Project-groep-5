require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});



con.query('select * from PRODUCTMODEL where cat_ID = 1', function(err, result) {
    if (err) {
        console.error('Error selecting from database:', err);
        return;
    }
    console.log('Selected from database:', result);
});
