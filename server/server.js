const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// Create the application with express
const app = express();

app.use(cors());
app.use(express.json());

// Connect database with server
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ws",
});

// API start with nodemon
app.get("/api/get", (req, res) => {
  const request = "SELECT * FROM project ORDER BY created_at DESC";
  db.query(request, (error, result) => {
    res.send(result);
  });
});

// Start on port 8000
app.listen(8000);
