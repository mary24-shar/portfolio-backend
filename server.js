const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==================== MYSQL CONNECTION ====================
// I am using your Railway credentials from your screenshot
const db=mysql.createConnection({
    host:"crossover.proxy.rlwy.net",
    user: "root",
    password:"zcRxegzyieCQNfrwbXiTMqbtrcmKGxLe",
    database: "railway",
    port:21930
});

db.connect((err) => {
    if (err) {
        console.log("❌ DB Connection Failed:", err);
    } else {
        console.log("✅ Connected to MySQL (Railway)");
    }
});

// ==================== ROUTES ====================

// 1. Test Route
app.get("/", (req, res) => {
    res.send("🚀 Backend is running and connected to the 'projects' table!");
});

// 2. Get All Projects (To show on your portfolio)
app.get("/projects", (req, res) => {
    const mysql = "SELECT * FROM projects";
    db.query(mysql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 3. Save Message/Project to the 'projects' table
// This matches your existing columns: title, description, technology_stack, github_link
app.post("/contact", (req, res) => {
    const { title, description, technology_stack, github_link } = req.body;

    const mysql = "INSERT INTO projects (title, description, technology_stack, github_link) VALUES (?, ?, ?, ?)";

    db.query(mysql, [title, description, technology_stack, github_link], (err, result) => {
        if (err) {
            console.log("❌ Insert Error:", err);
            return res.status(500).json({ error: "Database error. Check your column names!" });
        }
        console.log("✅ Data saved to projects table:", result);
        res.json({ message: "Project details saved successfully! 💜" });
    });
});

// ==================== START SERVER ====================
const PORT =  process.env.PORT||5000;
app.listen(PORT, () => {
    console.log(`https://portfolio-backend-7kfj.onrender.com ${PORT}`)
    });