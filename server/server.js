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
    // Handle errors in the "Security" step
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
    (error, _) => {
      // Replace 'result' with '_' as not necessary
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
  const { projectname, projectstart, projectend, projectcomment } = req.body; // Destructure request body

  const request =
    "UPDATE project SET projectname = ?, projectstart = ?, projectend = ?, projectcomment = ? WHERE projectid = ?";

  db.query(
    request,
    [projectname, projectstart, projectend, projectcomment, projectId],
    (error, _) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error: The project could not be updated");
      }
      res.status(200).send("Project successfully updated !");
    }
  );
});

// Show selected project
app.get("/api/get-tasks/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const request = `
    SELECT 
      task.*, 
      role.rolename,
      project.projectname, 
      user.userpic
    FROM task
    JOIN role ON task.role_roleid = role.roleid
    JOIN project ON task.project_projectid = project.projectid
    LEFT JOIN user ON task.role_roleid = user.user_roleid
    WHERE task.project_projectid = ?
  `;
  db.query(request, [projectId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: Tasks cannot be retrieved");
    }
    res.send(result);
  });
});

// Get project by ID
app.get("/api/get-project/:projectId", (req, res) => {
  const projectId = req.params.projectId; // Get role ID from URL
  const request = "SELECT * FROM project WHERE projectid = ?";

  db.query(request, [projectId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: Project cannot be retrieved");
    }
    if (result.length === 0) {
      return res.status(404).send("Project not found");
    }
    res.send(result[0]);
  });
});

// Get role by ID
app.get("/api/get-role/:roleId", (req, res) => {
  const roleId = req.params.roleId;
  const request = "SELECT * FROM role WHERE roleid = ?";

  db.query(request, [roleId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: Role cannot be retrieved");
    }
    if (result.length === 0) {
      return res.status(404).send("Role not found");
    }
    res.send(result[0]);
  });
});

// Get tasks by role and user
app.get("/api/get-tasks-by-role/:projectId/:roleId", (req, res) => {
  const projectId = req.params.projectId;
  const roleId = req.params.roleId; // Get role ID from URL

  const request = `
      SELECT task.*, role.rolename, project.projectname, user.userpic 
      FROM task 
      JOIN role ON task.role_roleid = role.roleid 
      JOIN project ON task.project_projectid = project.projectid 
      JOIN user ON task.user_userid = user.userid
      WHERE task.project_projectid = ? AND task.role_roleid = ?;
  `;

  db.query(request, [projectId, roleId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: Tasks cannot be retrieved");
    }
    res.send(result);
  });
});

// Start on port 8000
app.listen(8000);
