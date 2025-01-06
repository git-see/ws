const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// Create the application with express
const app = express();

// Start on port 8000
app.listen(8000);

// URL + nodemon server.js
app.get("/testserver", (req, res) => {
  res.send("Server start successful !");
});
