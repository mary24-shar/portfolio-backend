// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");


const app = express();
// middleware
app.use(cors());
app.use(express.json());

// ================= MYSQL CONNECTION =================
const db = mysql.createConnection({
    host:crossover.proxy.rlwy.net ,
    user:root ,
password:EqewkVjySjOTioIHlhjDLUoYfUFkPdie,
    database:railway,
    port:32290
});
// Connect to MySQL
db.connect(err => {
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
    const{name,email,message};=req.body;

    db.query(sql,(err,result)=>{
        if (err) {
            console.error(err);
            return res.send("error fetching messages");
        }
        res.json(result);
    });
    });

    const sql = "INSERT INTO projects (name,email,messages) VALUES (?, ?, ?)";

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




// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`https://portfolio-backend-7kfj.onrender.com${PORT}`);
});