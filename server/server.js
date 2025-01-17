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

// --------------------- Auth Routes ---------------------
// Login
app.post("/api/login", (req, res) => {
  const { userpic, password } = req.body;

  const query = "SELECT * FROM user WHERE userpic = ? AND password = ?";
  db.query(query, [userpic, password], (error, result) => {
    if (error) {
      return res.status(500).send("Error during authentication");
    }
    if (result.length > 0) {
      // Authentication successful, return user data or token
      res.status(200).send(result[0]);
    } else {
      res.status(401).send("Authentication failed!");
    }
  });
});

// Regsiter

// --------------------- Projects Routes ---------------------
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
    LEFT JOIN user ON task.user_userid = user.userid
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

// Update a project
app.put("/api/update/:id", (req, res) => {
  const projectId = req.params.id;
  const { projectname, projectstart, projectend, projectcomment } = req.body;
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

// --------------------- Roles Routes ---------------------
// Get all roles
app.get("/api/get-roles", (req, res) => {
  const request = "SELECT * FROM role";
  db.query(request, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: Roles cannot be retrieved");
    }
    res.send(result);
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

// --------------------- Users/Roles Routes ---------------------
// Get all users
app.get("/api/get-users", (req, res) => {
  const request = "SELECT * FROM user";
  db.query(request, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: Users cannot be retrieved");
    }
    res.send(result);
  });
});

// Get users by role ID
app.get("/api/get-users-by-role/:roleId", (req, res) => {
  const roleId = req.params.roleId;
  const request = "SELECT * FROM user WHERE user_roleid = ?";

  db.query(request, [roleId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: Users cannot be retrieved");
    }
    res.send(result);
  });
});

// Add a user with role creation if necessary
app.post("/api/add-user", (req, res) => {
  const { rolename, userpic } = req.body;

  // Check if the role exists
  const roleCheckQuery = "SELECT roleid FROM role WHERE rolename = ?";

  db.query(roleCheckQuery, [rolename], (error, result) => {
    if (error) {
      console.error("Error checking role:", error);
      return res.status(500).send("Error checking role");
    }

    let roleId;

    if (result.length > 0) {
      roleId = result[0].roleid; // Role exists
    } else {
      // Role does not exist, create it
      const insertRoleQuery = "INSERT INTO role (rolename) VALUES (?)";
      db.query(insertRoleQuery, [rolename], (insertError, insertResult) => {
        if (insertError) {
          console.error("Error adding role:", insertError);
          return res.status(500).send("Error creating role");
        }
        roleId = insertResult.insertId; // Get the new role ID

        // Now insert the user
        const insertUserQuery =
          "INSERT INTO user (userpic, user_roleid) VALUES (?, ?)";
        db.query(insertUserQuery, [userpic, roleId], (userError) => {
          if (userError) {
            console.error("Error adding user:", userError);
            return res.status(500).send("Error: The user could not be created");
          }
          res.status(200).send("User added successfully !");
        });
      });
      return; // Important: return to prevent executing the next lines of code
    }

    // Insert the user if the role already exists
    const insertUserQuery =
      "INSERT INTO user (userpic, user_roleid) VALUES (?, ?)";
    db.query(insertUserQuery, [userpic, roleId], (userError) => {
      if (userError) {
        console.error("Error adding user:", userError);
        return res.status(500).send("Error: The user could not be created");
      }
      res.status(200).send("User added successfully !");
    });
  });
});

// Update a user
app.put("/api/update-user/:id", (req, res) => {
  const userId = req.params.id;
  const { rolename, userpic } = req.body;
  const request =
    "UPDATE user SET userpic = ?, user_roleid = (SELECT roleid FROM role WHERE rolename = ?) WHERE userid = ?";

  db.query(request, [userpic, rolename, userId], (error, _) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: The user could not be updated");
    }
    res.status(200).send("User successfully updated !");
  });
});

// Delete a user
app.delete("/api/delete-user/:id", (req, res) => {
  const userId = req.params.id;
  const request = "DELETE FROM user WHERE userid = ?";

  db.query(request, [userId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: The user could not be deleted");
    }
    res.status(200).send("User successfully deleted !");
  });
});

// --------------------- Tasks Routes ---------------------
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

// Add a task
app.post("/api/add-task", (req, res) => {
  const {
    project_projectid,
    role_roleid,
    user_userid,
    taskobjective,
    taskstart,
    taskend,
    taskcomment,
    taskstatus,
  } = req.body;

  const request =
    "INSERT INTO task (project_projectid, role_roleid, user_userid, taskobjective, taskstart, taskend, taskcomment, taskstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    request,
    [
      project_projectid,
      role_roleid,
      user_userid,
      taskobjective,
      taskstart,
      taskend,
      taskcomment,
      taskstatus,
    ],
    (error, result) => {
      if (error) {
        console.error("Erreur lors de l'ajout de la tâche :", error);
        return res
          .status(500)
          .send("Error: The task could not be created. " + error.message);
      }
      res.status(200).send("Task added successfully !");
    }
  );
});

// Update a task
app.put("/api/update-task/:id", (req, res) => {
  const taskId = req.params.id;
  const { taskstart, taskend, taskcomment, taskstatus } = req.body;
  const request =
    "UPDATE task SET taskstart = ?, taskend = ?, taskcomment = ?, taskstatus = ? WHERE taskid = ?";

  db.query(
    request,
    [taskstart, taskend, taskcomment, taskstatus, taskId],
    (error, _) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error: The task could not be updated");
      }
      res.status(200).send("Task successfully updated !");
    }
  );
});

// Delete a task with condition (irreversible)
app.delete("/api/delete-task/:id", (req, res) => {
  const taskId = req.params.id;
  const request = "DELETE FROM task WHERE taskid = ?";

  db.query(request, [taskId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: The task could not be deleted");
    }
    res.status(200).send("Task successfully deleted !");
  });
});

// Start on port 8000
app.listen(8000);
