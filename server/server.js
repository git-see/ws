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
// READ all projects
app.get("/api/get", (req, res) => {
  const request = "SELECT * FROM project ORDER BY created_at DESC";
  db.query(request, (error, result) => {
    res.send(result);
  });
});

// Create a project
app.post("/api/post", (req, res) => {
  const { projectname, projectstart, projectend, projectcomment } = req.body;
  const request =
    "INSERT INTO project (projectname, projectstart, projectend, projectcomment) VALUES (?, ?, ?, ?)";

  db.query(
    request,
    [projectname, projectstart, projectend, projectcomment],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Erreur lors de l'ajout du projet."); // Renvoie une erreur en cas d'échec
      }
      res.status(200).send("Projet ajouté avec succès."); // Renvoie un succès
    }
  );
});

// Start on port 8000
app.listen(8000);
