require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const jwt = require("jsonwebtoken");
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

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("No token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).send("Not admin");
    }

    next();
  } catch (err) {
    return res.status(403).send("Invalid token");
  }
};

// PRODUCTS
app.get("/products", verifyAdmin, (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});


app.get("/", verifyAdmin, (req, res) => {
  res.send("VICTUS Backend Running 🚀");
});

app.post("/products", verifyAdmin, (req, res) => {
  const { name, price, image } = req.body;

  db.query(
    "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Product created");
    }
  );
});

app.delete("/products/:id", verifyAdmin, (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted");
  });
});

app.put("/products/:id", verifyAdmin, (req, res) => {
  const id = req.params.id;
  const { name, price, image } = req.body;

  db.query(
    "UPDATE products SET name=?, price=?, image=? WHERE id=?",
    [name, price, image, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Updated");
    }
  );
});

// JWT
app.post("/admin/login", verifyAdmin, (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } else {
    res.status(401).send("Unauthorized");
  }
});

// ORDERS
app.post("/orders", verifyAdmin, (req, res) => {
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

app.get("/orders", verifyAdmin, (req, res) => {
  db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.put("/orders/:id", verifyAdmin, (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  db.query(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Status updated");
    }
  );
});

app.delete("/orders/:id", verifyAdmin, (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM orders WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted");
  });
});

// ADMIN LOGIN
app.post("/admin/login", verifyAdmin, (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});



// ✅ START SERVER (always at bottom)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});