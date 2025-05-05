const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SchoolDB",
});

db.connect(err => {
    if (err) {
        console.error("❌ Connection error: " + err.stack);
        return;
    }
    console.log("✅ Connected to MySQL");
});

app.get("/", (req, res) => res.send("API is working"));

app.post("/add", (req, res) => {
    const { name, math, science, english } = req.body;
    const average = ((math + science + english) / 3).toFixed(2);
    const grade = average >= 90 ? 'A' : average >= 80 ? 'B' : average >= 70 ? 'C' : 'D';

    db.query(
        "INSERT INTO Students (name, math, science, english, average, grade) VALUES (?, ?, ?, ?, ?, ?)",
        [name, math, science, english, average, grade],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Student added" });
        }
    );
});

app.listen(3001, () => console.log("Server running on port 3001"));
