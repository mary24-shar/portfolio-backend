const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ================= MYSQL CONNECTION ================= */

// ⚠️ Using your existing Railway credentials
const db = mysql.createConnection({
  host: "crossover.proxy.rlwy.net",
  user: "root",
  password: "zcRxegzyieCQNfrwbXiTMqbtrcmKGxLe",
  database: "railway",
  port: 21930,
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL (Railway)");
  }
});

/* ================= ROUTES ================= */

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// Get all projects
app.get("/projects", (req, res) => {
  const sql = "SELECT * FROM projects";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

/* ================= CONTACT FORM (FIXED) ================= */

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = `
    INSERT INTO projects (title, description, technology_stack, github_link)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,                 // title
      message,              // description
      email,                // technology_stack
      "from-contact-form",  // github_link (dummy value)
    ],
    (err, result) => {
      if (err) {
        console.log("❌ Insert Error:", err);
        return res.status(500).json({ error: err.message });
      }

      console.log("✅ Data saved:", result);
      res.json({ message: "Message sent successfully!" });
    }
  );
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});