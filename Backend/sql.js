require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});


// // Define endpoint to retrieve products
// app.get('/product', (req, res) => {
//     con.query('SELECT * FROM PRODUCTMODEL WHERE cat_ID = 1', (err, result) => {
//         if (err) {
//             console.error('Error selecting from database:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//         console.log('Selected from database:', result);
//         res.json(result);
//     });
// });

// // Start the Express server
// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });

// con.query('SELECT * FROM PRODUCTMODEL WHERE cat_ID = 1', (err, result) => {
//     if (err) {
//         console.error('Error selecting from database:', err);
//             return;
//     }
//     console.log('Selected from database:', result);
// }
// );
