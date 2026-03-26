// ================= IMPORTS =================
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

// ================= APP SETUP =================
const app = express();

app.use(cors());
app.use(express.json());

// ================= MYSQL CONNECTION =================
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABSES,
    port:process.env.MYSQLPORT || 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("❌ DB Connection Failed:", err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});

// ================= ROUTES =================

// Test route
app.get("/", (req, res) => {
    res.send("🚀 Backend running with MySQL");
});

// Save message to database
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            message: "All fields are required ❌"
        });
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log("❌ Insert Error:", err);
            return res.status(500).json({
                message: "Database error ❌"
            });
        }

        console.log("📩 Message saved:", result);

        res.json({
            message: "Message saved to database 💜"
        });
    });
});

// Get all messages (optional for testing/admin)
app.get("/messages", (req, res) => {
    db.query("SELECT * FROM messages", (err, results) => {
        if (err) {
            console.log("❌ Fetch Error:", err);
            return res.status(500).json({
                message: "Error fetching data ❌"
            });
        }

        res.json(results);
    });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});