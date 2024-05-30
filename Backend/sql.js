const express = require("express");
const multer = require("multer");
const path = require("path");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");
const app = express();
const env = require("dotenv").config().parsed;

 //sql lokaal 
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'test',
//     database: 'project',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

//_______________________________________________________
//sql schooldb

const poolPromise = mysqlPromise.createPool({
  host: env.HOST, 
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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
    console.log("Products retrieved from database:", results); // Log the results object
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

app.post("/deleteproduct", (req, res) => {
  const {id} = req.body;
  const query = "DELETE FROM PRODUCTMODEL WHERE model_ID = ?";
  pool.query(query, [id], (err, result) => { // Pass id as parameter to query
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Product deleted successfully");
  });
});


// User-interface-------------------------------------------------------------------------------

app.get('/homescreen', async (req, res) => {
  try {
    const audioSlider = await poolPromise.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [1]);
    const belichtingSlider = await poolPromise.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [2]);
    const variaSlider = await poolPromise.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [3]);
    const videoSlider = await poolPromise.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [4]);
    const xrSlider = await poolPromise.query("SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?", [5]);
    res.render("User-interface/homescreen", {
      audioSlider: audioSlider[0],
      belichtingSlider: belichtingSlider[0],
      variaSlider: variaSlider[0],
      videoSlider: videoSlider[0],
      xrSlider: xrSlider[0]
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/verlenging', (req, res) => {
  res.render('User-interface\Verlenging');
});

app.get("/login", (req, res) => {
    res.render("User-interface/Login/login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await poolPromise.query("SELECT * FROM USER WHERE email = ?", [email]);
    if (rows.length > 0) {
      const user = rows[0];
      if (await argon2.verify(user.password, password)) {
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ token });

        return;
      } else {
        res.status(401).send("Invalid credentials");

   
        return;
      }
    } else {
      res.status(401).send("Invalid credentials");

    
      return;
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Error during login");
  }
});

app.get("/signUp", (req, res) => {
    res.render("User-interface/Login/signUp");
});

try {
  app.post('/signUp', async (req, res) => {
    const { password, email } = req.body;
    const username = email.split('@')[0];
    const hashedPassword = await argon2.hash(password);
    await poolPromise.query('INSERT INTO USER (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    res.status(201).send('User registered');
  });
} catch (err) {
  console.error('Error registering user:', err);
  res.status(500).send('Error registering user');
}


app.get("/reservatie-van-producten/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const [productInfo] = await poolPromise.query("SELECT * FROM PRODUCT INNER JOIN PRODUCTMODEL ON PRODUCT.Model_ID = PRODUCTMODEL.Model_ID WHERE PRODUCT.product_ID = ?", [productId]);
    if (productInfo.length === 0) {
      res.status(404).send("Product not found");
      return;
    }
    res.render("User-interface/product-reservatie/reservatie-van-producten", { product: productInfo[0] });
  } catch (err) {
    console.error("Error fetching product information:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getproducteninfo/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const [productInfo] = await poolPromise.query(
      "SELECT * FROM PRODUCT INNER JOIN PRODUCTMODEL ON PRODUCT.Model_ID = PRODUCTMODEL.Model_ID WHERE PRODUCT.Model_ID = ?",
      [productId]
    );

    if (productInfo.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Fetch all products with the same model_ID
    const [relatedProducts] = await poolPromise.query(
      "SELECT * FROM PRODUCT WHERE Model_ID = ?",
      [productInfo[0].Model_ID]
    );
    res.json({ product: productInfo[0], relatedProducts: relatedProducts });
  } catch (err) {
    console.error("Error fetching product information:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/reservatie-van-producten/:id", async (req, res) => {
  const ProductId = req.params.id;
  const { van, tot } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await poolPromise.query("SELECT * FROM USER WHERE username = ?", [decoded.username]);
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = user[0].user_ID;
    console.log("User ID:", userId);
    await poolPromise.query("INSERT INTO RESERVATIE (user_ID, Product_ID, begin_datum, eind_datum) VALUES (?, ?, ?, ?)", [userId, ProductId, van, tot]);
    return res.status(201).json({ message: "Product reserved" });
  } catch (err) {
    console.error("Error reserving product:", err);
    return res.status(500).json({ error: "Error reserving product" });
  }
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
    res.render("User-interface/catalogus/belichting-catalogus", { products:results });
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
app.get("/user-info", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await poolPromise.query("SELECT * FROM USER WHERE username = ?", [decoded.username]);
    if (rows.length > 0) {
      const user = rows[0];
      return res.json({ username: user.username, email: user.email });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error fetching user info:", err);
    return res.status(500).send("Error fetching user info");
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); // Add closing parenthesis here

