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

// con.query('insert into product (name,price,description,image,category,stock) values ("test",24,"test","test","test",1)', function(err, result) {
//     if (err) {
//         console.error('Error inserting into database:', err);
//         return;
//     }
//     console.log('Inserted into database');
// });
con.query('select * from test', function(err, result) {
    if (err) {
        console.error('Error selecting from database:', err);
        return;
    }
    console.log('Selected from database:', result);
});