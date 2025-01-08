const express = require("express"); 
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "wsreactnodesql",
});

app.get("/api/get", (req, res) => {
  const request = "SELECT * FROM project ORDER BY created_at DESC";
  db.query(request, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { projectname, projectstart, projectend, projectcomment } = req.body;
  const request = "INSERT INTO project (projectname, projectstart, projectend, projectcomment) VALUES (?, ?, ?, ?)";
  
  db.query(request, [projectname, projectstart, projectend, projectcomment], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Erreur lors de l'ajout du projet."); // Renvoie une erreur en cas d'échec
    }
    res.status(200).send("Projet ajouté avec succès."); // Renvoie un succès
  });
});

app.put("/api/update/:id", (req, res) => {
  const projectId = req.params.id;
  const { projectname, projectstart, projectend, projectcomment } = req.body;

  const request = "UPDATE project SET projectname = ?, projectstart = ?, projectend = ?, projectcomment = ? WHERE projectid = ?";
  
  db.query(request, [projectname, projectstart, projectend, projectcomment, projectId], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Erreur lors de la mise à jour du projet.");
    }
    res.status(200).send("Projet mis à jour avec succès.");
  });
});


// Voir un seul projet
app.get("/api/get-tasks/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const request = `
      SELECT task.*, role.rolename AS taskrole, project.projectname 
      FROM task 
      JOIN role ON task.role_roleid = role.roleid
      JOIN project ON task.project_projectid = project.projectid  
      WHERE task.project_projectid = ?
  `;
  db.query(request, [projectId], (error, result) => {
      if (error) {
          console.error(error);
          return res.status(500).send("Erreur lors de la récupération des tâches.");
      }
      res.send(result);
  });
});


app.listen(8500);
