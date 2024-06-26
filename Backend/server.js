const express = require("express");
const multer = require("multer");
const path = require("path");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");
const app = express();
const env = require("dotenv").config().parsed;
const CryptoJS = require('crypto-js');
//aanmaken alle dependencies


// functies om rol uit token onleesbaar te maken en leesbaar te maken
// update jullie .env bestand met een AES_KEY:... zie discord.
function decryptAES(ciphertext, key) {
  let bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function encryptAES(text, key) {
  console.log(CryptoJS.AES.encrypt(text, key).toString())
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decryptRoleFromToken(token) {
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.role) {
      throw new Error("Invalid token");
  }
  return decryptAES(decoded.role, process.env.AES_KEY);
}

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

//opzetten van de connectie met de database
const pool = mysql.createPool({
  host: env.HOST,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const poolPromise = mysqlPromise.createPool({
  host: env.HOST,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "..", "frontend", "views"));

app.use(express.static(path.join(__dirname, "..", "frontend", "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("User-interface/Login/login");
});

// route om rol te decrypten uit token
app.get("/getRole", (req, res) => {
  
  if (!req.headers.authorization) {
      return res.status(400).json({ error: "Authorization header missing" });
  }

  const tokenParts = req.headers.authorization.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ error: "Malformed token" });
  }

  const token = tokenParts[1];
  try {
      const decryptedRole = decryptRoleFromToken(token);
      res.json({ role: decryptedRole });
  } catch (error) {
      console.error("Error decrypting role:", error);
      res.status(500).json({ error: "Failed to decrypt role" });
  }
});
// Admin-interface-------------------------------------------------------------------------------

//route voor de hoofdpagina van de admin-interface
app.get("/HoofdMenuAdmin", (req, res) => {
  const queryReservations = `
    SELECT 
      RESERVATIE.*, 
      PRODUCT.*, 
      PRODUCTMODEL.*, 
      USER.email, 
      USER.username
    FROM 
      RESERVATIE
    LEFT JOIN 
      PRODUCT ON RESERVATIE.product_ID = PRODUCT.product_ID
    LEFT JOIN 
      PRODUCTMODEL ON PRODUCT.model_ID = PRODUCTMODEL.model_ID
    LEFT JOIN 
      USER ON RESERVATIE.user_ID = USER.user_ID
    WHERE 
      RESERVATIE.begin_datum = CURDATE()
      and PRODUCT.status = 1
  `;

  const queryUitgeleend = `SELECT COUNT(*) AS uitgeleend_count FROM PRODUCT WHERE status = 2`;
  const queryTeLaat = `SELECT COUNT(*) AS telaat_count FROM PRODUCT WHERE status = 3`;

  pool.query(queryReservations, (err, reservations) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    pool.query(queryUitgeleend, (err, uitgeleendResult) => {
      if (err) {
        console.error("Error fetching uitgeleend count:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const uitgeleendCount = uitgeleendResult[0].uitgeleend_count;

      pool.query(queryTeLaat, (err, telaatResult) => {
        if (err) {
          console.error("Error fetching telaat count:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        const telaatCount = telaatResult[0].telaat_count;

        res.render("Admin-Interface/HoofdMenuAdmin", {
          reservations: reservations,
          uitgeleendCount: uitgeleendCount,
          telaatCount: telaatCount
        });
      });
    });
  });
});

//route voor de pagina van de producten van de admin die binnenkomen
app.get("/HoofdMenuAdminInkomend", (req, res) => {
  const queryReservations = `
    SELECT 
      RESERVATIE.*, 
      PRODUCT.*, 
      PRODUCTMODEL.*, 
      USER.email, 
      USER.username
    FROM 
      RESERVATIE
    LEFT JOIN 
      PRODUCT ON RESERVATIE.product_ID = PRODUCT.product_ID
    LEFT JOIN 
      PRODUCTMODEL ON PRODUCT.model_ID = PRODUCTMODEL.model_ID
    LEFT JOIN 
      USER ON RESERVATIE.user_ID = USER.user_ID
    WHERE 
      RESERVATIE.eind_datum = CURDATE()
  `;

  const queryUitgeleend = `SELECT COUNT(*) AS uitgeleend_count FROM PRODUCT WHERE status = 2`;
  const queryTeLaat = `SELECT COUNT(*) AS telaat_count FROM PRODUCT WHERE status = 3`;

  pool.query(queryReservations, (err, reservations) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    pool.query(queryUitgeleend, (err, uitgeleendResult) => {
      if (err) {
        console.error("Error fetching uitgeleend count:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const uitgeleendCount = uitgeleendResult[0].uitgeleend_count;

      pool.query(queryTeLaat, (err, telaatResult) => {
        if (err) {
          console.error("Error fetching telaat count:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        const telaatCount = telaatResult[0].telaat_count;

        res.render("Admin-Interface/HoofdMenuAdminInkomend", {
          reservations: reservations,
          uitgeleendCount: uitgeleendCount,
          telaatCount: telaatCount
        });
      });
    });
  });
});


//route voor de pagina van de producten van de admin zodat hij ze kan goedkeuren in de categorie audio
app.get("/producten", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK",
    [1],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error test");
        return;
      }
      console.log("Products retrieved from database:", results); // Log the results object
      res.render("Admin-Interface/productenadmin/producten", { products: results });
    }
  );
});

//route voor de pagina van de producten van de admin zodat hij ze kan goedkeuren in de categorie belichting
app.get("/productenbelichting", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK",
    [2],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("Admin-Interface/productenadmin/productenbelichting", { products: results });
    }
  );
});
//route voor de pagina van de producten van de admin zodat hij ze kan goedkeuren in de categorie varia
app.get("/productenvaria", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK",
    [3],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("Admin-Interface/productenadmin/productenvaria", { products: results });
    }
  );
});
//route voor de pagina van de producten van de admin zodat hij ze kan goedkeuren in de categorie xr
app.get("/productenxr", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK",
    [5],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("Admin-Interface/productenadmin/productenxr", { products: results });
    }
  );
});
//route voor de pagina van de producten van de admin zodat hij ze kan goedkeuren in de categorie video
app.get("/productenvideo", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ? ORDER BY MERK",
    [4],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("Admin-Interface/productenadmin/productenvideo", { products: results });
    }
  );
});


// Route voor het toevoegen van een product
app.post("/addProduct", upload.single("productFoto"), (req, res) => {
  const { productName, productDescription, category, merk } = req.body;
  const productFoto = req.file.buffer;
  const query =
    "INSERT INTO PRODUCTMODEL (Naam,MERK,Beschrijving, Afbeelding, Cat_ID) VALUES (?, ?, ?, ?, ?)";
  pool.query(
    query,
    [productName, merk, productDescription, productFoto, category],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send("Product added successfully");
    }
  );
});

//route voor het verwijderen van een product
app.post("/deleteproduct", (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM PRODUCTMODEL WHERE model_ID = ?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Product deleted successfully");
  });
});

//route voor het verkrijgen van informatie van een product
app.get("/getProductInfo/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM PRODUCTMODEL WHERE model_ID = ?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result[0]);
  });
});

//route voor het verkrijgen van de verschillende producten van een welbepaald model
app.get("/getRealProducts/:modelId", (req, res) => {
  const { modelId } = req.params;
  const query = "SELECT * FROM PRODUCT WHERE Model_ID = ?";
  pool.query(query, [modelId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

//route voor het aanpassen van een product
app.post("/editProduct", upload.single("productFoto"), (req, res) => {
  const { productId, productName, productDescription, category, merk } = req.body;
  const productFoto = req.file ? req.file.buffer : null;

  let query;
  let queryParams;

  if (productFoto) {
    query = "UPDATE PRODUCTMODEL SET Naam = ?, MERK = ?, Beschrijving = ?, Afbeelding = ?, Cat_ID = ? WHERE model_ID = ?";
    queryParams = [productName, merk, productDescription, productFoto, category, productId];
  } else {
    query = "UPDATE PRODUCTMODEL SET Naam = ?, MERK = ?, Beschrijving = ?, Cat_ID = ? WHERE model_ID = ?";
    queryParams = [productName, merk, productDescription, category, productId];
  }

  pool.query(query, queryParams, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Product updated successfully");
  });
});

//route voor het aanmaken van een exemplaar van een product

app.post("/addRealProduct", (req, res) => {
  const { modelId } = req.body;
  const query = "INSERT INTO PRODUCT (Model_ID) VALUES (?)";
  pool.query(query, [modelId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Real product added successfully");
  });
});
//route voor het verwijderen van een exemplaar van een product
app.post("/removeRealProduct", (req, res) => {
  const { realProductId } = req.body;
  const query = "DELETE FROM PRODUCT WHERE product_ID = ?";
  pool.query(query, [realProductId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Real product removed successfully");
  });
});

//route voor het terugbrengen van een product
app.post("/returnproduct", (req, res) => {
  const { productId, reservationId } = req.body;
  console.log("Product ID:", productId);
  console.log("Reservation ID:", reservationId);

  const updateProductQuery = "UPDATE PRODUCT SET status = 0 WHERE product_ID = ?";
  const deleteReservationQuery = "DELETE FROM RESERVATIE WHERE reservatie_ID = ?";

  pool.query(updateProductQuery, [productId], (err, productResult) => {
    if (err) {
      console.error("Error updating product status:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    pool.query(deleteReservationQuery, [reservationId], (err, deleteResult) => {
      if (err) {
        console.error("Error deleting reservation:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.send("Product returned successfully and reservation deleted");
    });
  });
});
//route voor het uitlenen van een product
app.post("/geefproduct", (req, res) => {
  const { productId, reservationId, userId } = req.body;
  console.log("Product ID:", productId);
  console.log("Reservation ID:", reservationId);
  console.log("User ID:", userId);

  const updateProductQuery = "UPDATE PRODUCT SET status = 2 WHERE product_ID = ?";
  const deleteReservationQuery = "DELETE FROM RESERVATIE WHERE reservatie_ID = ?";
  const updateUser = "UPDATE USER SET Blacklist = 1 WHERE user_ID = ?";

  pool.query(updateProductQuery, [productId], (err, productResult) => {
    if (err) {
      console.error("Error updating product status:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    pool.query(deleteReservationQuery, [reservationId], (err, deleteResult) => {
      if (err) {
        console.error("Error deleting reservation:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      pool.query(updateUser, [userId], (err, userResult) => {
        if (err) {
          console.error("Error updating user:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        res.send("Product given successfully and reservation deleted");
      }
      );
    });
  });
});

app.post("/leen", (req, res) => {
pool.query("UPDATE PRODUCT SET status = 2 WHERE product_ID = ?", [req.body.productId], (err, result) => {
  
  if (err) {
    console.error("Error updating product status:", err);
    res.status(500).send("Internal Server Error");
    return;
  }
  res.send("Product returned successfully");
}
);
});




// User-interface-------------------------------------------------------------------------------

//route voor de hoofdpagina van de user-interface
app.get("/homescreen", async (req, res) => {
  try {
    const audioSlider = await poolPromise.query(
      "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
      [1]
    );
    const belichtingSlider = await poolPromise.query(
      "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
      [2]
    );
    const variaSlider = await poolPromise.query(
      "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
      [3]
    );
    const videoSlider = await poolPromise.query(
      "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
      [4]
    );
    const xrSlider = await poolPromise.query(
      "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
      [5]
    );
    res.render("User-interface/homescreen", {
      audioSlider: audioSlider[0],
      belichtingSlider: belichtingSlider[0],
      variaSlider: variaSlider[0],
      videoSlider: videoSlider[0],
      xrSlider: xrSlider[0],
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/verlenging", (req, res) => {
  res.render("User-interfaceVerlenging");
});
//route voor de login pagina
app.get("/login", (req, res) => {
  res.render("User-interface/Login/login");
});
//route voor de login verwerkingspagina
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await poolPromise.query(
      "SELECT * FROM USER WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      const user = rows[0];
      if (await argon2.verify(user.password, password)) {
        const encryptedRole = encryptAES(user.rol, process.env.AES_KEY);
        const token = jwt.sign(
          { username: user.username, role: encryptedRole },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({ token , role: encryptedRole});
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

//route voor de registratie pagina
app.get("/signUp", (req, res) => {
  res.render("User-interface/Login/signUp");
});

//route voor de verwerking van de registratie
app.post("/signUp", async (req, res) => {
  try {
    const { password, email } = req.body;
    const username = email.split("@")[0];
    const hashedPassword = await argon2.hash(password);
    await poolPromise.query(
      "INSERT INTO USER (username, email, password, rol) VALUES (?, ?, ?, 'student')",
      [username, email, hashedPassword]
    );
    res.status(201).send("User registered");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
});

//route voor reservatie van product voor de info
app.get("/reservatie-van-producten/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const [productInfo] = await poolPromise.query(
      "SELECT * FROM PRODUCT INNER JOIN PRODUCTMODEL ON PRODUCT.Model_ID = PRODUCTMODEL.Model_ID WHERE PRODUCT.product_ID = ?",
      [productId]
    );
    if (productInfo.length === 0) {
      res.status(404).send("Product not found");
      return;
    }
    res.render("User-interface/product-reservatie/reservatie-van-producten", {
      product: productInfo[0],
    });
  } catch (err) {
    console.error("Error fetching product information:", err);
    res.status(500).send("Internal Server Error");
  }
});
//route voor reservatie van product voor de inf-verwerking
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
      "SELECT * FROM PRODUCT WHERE Model_ID = ? and status = 0",
      [productInfo[0].Model_ID]
    );
    res.json({ product: productInfo[0], relatedProducts: relatedProducts });
  } catch (err) {
    console.error("Error fetching product information:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//route voor de reservatie van producten verwerking
app.post("/reservatie-van-producten/:productID", async (req, res) => {
  const { van, tot } = req.body;
  const authHeader = req.headers.authorization;
  const product_ID = req.params.productID; 
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await poolPromise.query(
      "SELECT * FROM USER WHERE username = ?",
      [decoded.username]
    );
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = user[0].user_ID;
    console.log("User ID:", userId);

    await poolPromise.query("BEGIN;");

    await poolPromise.query(
      "INSERT INTO RESERVATIE (user_ID, product_ID , begin_datum, eind_datum) VALUES (?, ?, ?, ?)",
      [userId, product_ID, van, tot]
    );

    await poolPromise.query(
      "UPDATE PRODUCT SET status = 1 WHERE product_ID = ?",
      [product_ID]
    );
 
    await poolPromise.query("COMMIT;");
    return res.status(201).json({ message: "Product reserved" });
  } catch (err) {
    console.error("Error reserving product:", err);

    await poolPromise.query("ROLLBACK;");
    return res.status(500).json({ error: "Error reserving product" });
  }
});

//route voor het anuleren van een reservatie 
app.post("/annuleer-besteling", (req, res) => {
  const { productId, reservationId } = req.body;
  console.log("Product ID:", productId);
  console.log("Reservation ID:", reservationId);

  const updateProductQuery = "UPDATE PRODUCT SET status = 0 WHERE product_ID = ?";
  const deleteReservationQuery = "DELETE FROM RESERVATIE WHERE reservatie_ID = ?";

  pool.query(updateProductQuery, [productId], (err, productResult) => {
    if (err) {
      console.error("Error updating product status:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    pool.query(deleteReservationQuery, [reservationId], (err, deleteResult) => {
      if (err) {
        console.error("Error deleting reservation:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.send("Product returned successfully and reservation deleted");
    });
  });
});


//route voor de profiel pagina te tonen
app.get("/profiel-user/:email", (req, res) => {

  function rot13(str) {
    return str.replace(/[A-Za-z]/g, function(c) {
      return String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
      );
    });
  }

  const userEmail = rot13(req.params.email);

  pool.query(
    `
    SELECT 
      r.reservatie_ID, 
      r.product_ID, 
      DATE_FORMAT(r.eind_datum, '%d-%m-%Y') AS formatted_eind_datum, 
      DATE_FORMAT(r.begin_datum, '%d-%m-%Y') AS formatted_begin_datum, 
      p.Model_ID, 
      pm.naam AS product_name,
      p.status,
      u.rol as user_role
    FROM 
      RESERVATIE r
    JOIN 
      PRODUCT p ON r.product_ID = p.product_ID
    JOIN 
      PRODUCTMODEL pm ON p.Model_ID = pm.Model_ID
    JOIN 
      USER u ON r.user_ID = u.user_ID
    WHERE 
      u.email = ?
    ORDER BY 
      r.reservatie_ID
    `,
    [userEmail],
    (err, results) => {
      if (err) {
        console.error("Error fetching reservations:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      
      console.log("Reservations retrieved from database:", results);
      res.render("User-interface/profiel/profiel-user", {
        reservations: results,
        user: {
          role: results.length > 0 ? results[0].user_role : null // Assuming all rows have the same role
        }
      });
    }
  );
});


//route voor de audio catalogus
app.get("/audio-catalogus", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [1],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("User-interface/catalogus/audio-catalogus", {
        products: results,
      });
    }
  );
});
//route voor de belichting catalogus
app.get("/belichting-catalogus", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [2],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("User-interface/catalogus/belichting-catalogus", {
        products: results,
      });
    }
  );
});
//route voor de varia catalogus
app.get("/varia-catalogus", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [3],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("User-interface/catalogus/varia-catalogus", {
        products: results,
      });
    }
  );
});
//route voor de video catalogus
app.get("/video-catalogus", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [4],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("User-interface/catalogus/video-catalogus", {
        products: results,
      });
    }
  );
});
//route voor de xr catalogus
app.get("/xr-catalogus", (req, res) => {
  pool.query(
    "SELECT * FROM PRODUCTMODEL WHERE Cat_ID = ?",
    [5],
    (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("User-interface/catalogus/xr-catalogus", {
        products: results,
      });
    }
  );
});
//route voor de info van een user wordt gebruikt in verwerking ingelogd of niet
app.get("/user-info", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await poolPromise.query(
      "SELECT * FROM USER WHERE username = ?",
      [decoded.username]
    );
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
//openen van de server op poort 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
