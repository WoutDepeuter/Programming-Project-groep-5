const express = require("express");
const mysql = require("mysql2");
const app = express();
const env = require("dotenv").config().parsed;
const path = require("path"); // Add this line to import the path module

const pool = mysql.createPool({
  host: env.HOST,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "..", "frontend", "views"));

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));

// Route to render the index page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/audio", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [1],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        // Render an error page or handle the error appropriately
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("productenadmin/producten", { products: results });
    }
  );
});
// Route to render the productenbelichting page
app.get("/belichting", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [2],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        // Render an error page or handle the error appropriately
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("productenadmin/productenbelichting", { products: results });
    }
  );
});
app.get("/varia", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [3],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        // Render an error page or handle the error appropriately
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("productenadmin/productenvaria", { products: results });
    }
  );
});
app.get("/xr", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [5],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("productenadmin/productenxr", { products: results });
    }
  );
});
<<<<<<< HEAD
app.get('/video', (req, res) => {
    pool.query('SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?', [4], (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            // Render an error page or handle the error appropriately
            res.status(500).send('Internal Server Error');
            return;
            

        }
        res.render('productenadmin/productenvideo', { products: results });
    });
=======
app.get("/video", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [4],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        // Render an error page or handle the error appropriately
        res.status(500).send("Internal Server Error");
        return;
      }
    }
  );
>>>>>>> 6675921dc9e3f0819bb7f10ae01b8b5cce2d347f
});

app.get("/homepageadmin", (req, res) => {
  res.render("Admin-interface/HoofdMenuAdmin");
});

app.get("/catalogusaudio", (req, res) => {
  res.render("User-interface/catalogus/audio-catalogus");
});

app.get("/catalogusbelichting", (req, res) => {
  res.render("User-interface/catalogus/belichting-catalogus");
});

app.get("/catalogusvaria", (req, res) => {
  res.render("User-interface/catalogus/varia-catalogus");
});

app.get("/catalogusvideo", (req, res) => {
  res.render("User-interface/catalogus/video-catalogus");
});

app.get("/catalogusxr", (req, res) => {
  res.render("User-interface/catalogus/xr-catalogus");
});
app.get

app.get('/homescreen', (req,res) => {
    res.render('User-interface/homescreen');
});



app.get("/login", (req, res) => {
  res.render("User-interface/Login/login");
});

app.get("/signUp", (req, res) => {
  res.render("User-interface/Login/signUp");
});

app.get("/reservatie-van-producten", (req, res) => {
  res.render("User-interface/product-reservatie/reservatie-van-producten");
});

app.get("/profiel-user", (req, res) => {
  res.render("User-interface/profiel/profiel-user");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
