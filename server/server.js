const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ws",
});

// --------------------- Auth Routes ---------------------
// Login
app.post("/api/login", async (req, res) => {
  const { userpic, password } = req.body;

  const query = "SELECT * FROM user WHERE userpic = ?";
  db.query(query, [userpic], async (error, result) => {
    if (error) {
      return res.status(500).send("Error during authentication");
    }
    if (result.length > 0) {
      const user = result[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).send(user);
      } else {
        res.status(401).send("Authentication failed!");
      }
    } else {
      res.status(401).send("Authentication failed!");
    }
  });
});

// Update password
app.put("/api/update-password/:id", async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  const query = "SELECT * FROM user WHERE userid = ?";
  db.query(query, [userId], async (error, result) => {
    if (error) {
      return res.status(500).send("Error retrieving user");
    }

    if (result.length > 0) {
      const user = result[0];
      const match = await bcrypt.compare(currentPassword, user.password);
      if (match) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = "UPDATE user SET password = ? WHERE userid = ?";
        db.query(updateQuery, [hashedNewPassword, userId], (updateError) => {
          if (updateError) {
            console.error(updateError);
            return res.status(500).send("Error updating password");
          }
          res.status(200).send("Password updated successfully");
        });
      } else {
        res.status(401).send("Current password is incorrect");
      }
    } else {
      res.status(404).send("User not found");
    }
  });
});

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
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error: The project could not be created");
      }
      res.status(200).send("Project created successfully !");
    }
  );
});

// Read One- show selected project
app.get("/api/get-tasks/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const request =
    "SELECT task.*, role.rolename, project.projectname, user.userpic FROM task JOIN role ON task.role_roleid = role.roleid JOIN project ON task.project_projectid = project.projectid LEFT JOIN user ON task.user_userid = user.userid WHERE task.project_projectid = ?";
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
  const projectId = req.params.projectId;
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
  const {
    projectname,
    projectstart,
    projectend,
    projectcomment,
    projectstatus,
  } = req.body;
  const request =
    "UPDATE project SET projectname = ?, projectstart = ?, projectend = ?, projectcomment = ?, projectstatus = ? WHERE projectid = ?";
  db.query(
    request,
    [
      projectname,
      projectstart,
      projectend,
      projectcomment,
      projectstatus,
      projectId,
    ],
    (error) => {
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
app.post("/api/add-user", async (req, res) => {
  const { rolename, userpic, password } = req.body;

  // Validate incoming data
  if (!userpic || !rolename || !password) {
    return res.status(400).send("All fields are required.");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the role exists
  const roleCheckQuery = "SELECT roleid FROM role WHERE rolename = ?";

  db.query(roleCheckQuery, [rolename], (error, result) => {
    if (error) {
      console.error("Error checking role:", error);
      return res.status(500).send("Error checking role");
    }

    let roleId;

    if (result.length > 0) {
      // Role exists
      roleId = result[0].roleid;
      insertUser(userpic, hashedPassword, roleId, res);
    } else {
      // Role does not exist, create it
      const insertRoleQuery = "INSERT INTO role (rolename) VALUES (?)";
      db.query(insertRoleQuery, [rolename], (insertError, insertResult) => {
        if (insertError) {
          console.error("Error adding role:", insertError);
          return res.status(500).send("Error creating role");
        }
        roleId = insertResult.insertId; // Get the new role ID
        insertUser(userpic, hashedPassword, roleId, res);
      });
    }
  });
});

// Function to insert a user
function insertUser(userpic, password, roleId, res) {
  const insertUserQuery =
    "INSERT INTO user (userpic, password, user_roleid) VALUES (?, ?, ?)";
  db.query(insertUserQuery, [userpic, password, roleId], (userError) => {
    if (userError) {
      console.error("Error adding user:", userError);
      return res.status(500).send("Error: The user could not be created");
    }
    res.status(200).send("User added successfully !");
  });
}

// Update a user
app.put("/api/update-user/:id", (req, res) => {
  const userId = req.params.id;
  const { rolename, userpic } = req.body;

  // Validate incoming data
  if (!userpic || !rolename) {
    return res.status(400).send("All fields are required.");
  }

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
  db.query(request, [userId], (error) => {
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
  const roleId = req.params.roleId;
  const request =
    "SELECT task.*, role.rolename, project.projectname, user.userpic FROM task JOIN role ON task.role_roleid = role.roleid JOIN project ON task.project_projectid = project.projectid JOIN user ON task.user_userid = user.userid WHERE task.project_projectid = ? AND task.role_roleid = ?";

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
    (error) => {
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
    (error) => {
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

  db.query(request, [taskId], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error: The task could not be deleted");
    }
    res.status(200).send("Task successfully deleted !");
  });
});

app.listen(8000);
