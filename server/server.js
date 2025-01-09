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
        return res.status(500).send("Error: The project could not be created");
      }
      res.status(200).send("Project created successfully !");
    }
  );
});

// Update a project
app.put("/api/update/:id", (req, res) => {
  const projectId = req.params.id;
  const { projectname, projectstart, projectend, projectcomment } = req.body;

  const request =
    "UPDATE project SET projectname = ?, projectstart = ?, projectend = ?, projectcomment = ? WHERE projectid = ?";

  db.query(
    request,
    [projectname, projectstart, projectend, projectcomment, projectId],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error: The project could not be updated");
      }
      res.status(200).send("Project successfully updated !");
    }
  );
});

// Start on port 8000
app.listen(8000);
