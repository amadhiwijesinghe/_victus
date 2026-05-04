require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL ✅");
});

// PRODUCTS
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});


app.get("/", (req, res) => {
  res.send("VICTUS Backend Running 🚀");
});


// ORDERS
app.post("/orders", (req, res) => {
  const { items, total, name, phone1, phone2, address } = req.body;

  const query = `
    INSERT INTO orders (items, total, name, phone1, phone2, address)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [JSON.stringify(items), total, name, phone1, phone2, address],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Order saved");
    }
  );
});



// ✅ START SERVER (always at bottom)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});