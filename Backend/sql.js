// app.js
const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();
const env = require("dotenv").config().parsed;

// Create a MySQL pool
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

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to render the index page
app.get("/", (req, res) => {
  res.render("User-interface/Login/login");
});

// Admin-interface-------------------------------------------------------------------------------

app.get("/HoofdMenuAdmin", (req, res) => {
  // Perform the database query
  pool.query(`
    SELECT RESERVATIE.*, PRODUCT.*, PRODUCTMODEL.*, USER.email
    FROM RESERVATIE
    LEFT JOIN PRODUCT ON RESERVATIE.product_ID = PRODUCT.product_ID
    LEFT JOIN PRODUCTMODEL ON PRODUCT.model_ID = PRODUCTMODEL.model_ID
    LEFT JOIN USER ON RESERVATIE.user_ID = USER.user_ID
  `, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log(results);

    // Render the template with the fetched results
    res.render("productenadmin/HoofdMenuAdmin", { data: results });
  });
});


app.get("/producten", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK", [1], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error test");
      return;
    }
    res.render("productenadmin/producten", { products: results });
  });
});

app.get("/productenbelichting", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK", [2], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("productenadmin/productenbelichting", { products: results });
  });
});

app.get("/productenvaria", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK", [3], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("productenadmin/productenvaria", { products: results });
  });
});

app.get("/productenxr", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK", [5], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("productenadmin/productenxr", { products: results });
  });
});

app.get("/productenvideo", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK", [4], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("productenadmin/productenvideo", { products: results });
  });
});

// Route for adding a product
app.post("/addProduct", upload.single('productFoto'), (req, res) => {
  const { productName, productDescription, category,merk} = req.body;
  const productFoto = req.file.buffer;

  const query = "INSERT INTO PRODUCTMODEL (Naam,MERK,Beschrijving, Afbeelding, Cat_ID) VALUES (?, ?, ?, ?, ?)";
  pool.query(query, [productName,merk,productDescription, productFoto, category], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Product added successfully");
  });
});

// User-interface-------------------------------------------------------------------------------

app.get('/homescreen', (req, res) => {
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

app.get("/audio-catalogus", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [1], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("User-interface/catalogus/audio-catalogus", { products: results });
  });
});

app.get("/belichting-catalogus", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [2], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("User-interface/catalogus/belichting-catalogus", { products: results });
  });
});

app.get("/varia-catalogus", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [3], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("User-interface/catalogus/varia-catalogus", { products: results });
  });
});

app.get("/video-catalogus", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [4], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("User-interface/catalogus/video-catalogus", { products: results });
  });
});
app.get("/xr-catalogus", (req, res) => {
  pool.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [(5)], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("User-interface/catalogus/xr-catalogus", { products: results });
  });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
