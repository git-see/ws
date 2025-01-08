import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

export default function OneProject() {
  const { projectId } = useParams(); // Récupérer l'ID du projet à partir de l'URL
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState(""); // Nouvel état pour le nom du projet
  const navigate = useNavigate(); // Création d'une instance de useNavigate

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`http://localhost:8500/api/get-tasks/${projectId}`);
      setTasks(response.data);
      if (response.data.length > 0) {
        setProjectName(response.data[0].projectname); // Récupérer le nom du projet à partir de la première tâche
      }
    };
    fetchTasks();
  }, [projectId]);

  return (
    <div className="w-100 home">
      <div>
        <div className="col-12">
          <Menu />
        </div>




        <div className="d-flex justify-content-between">
          <div>
            <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            {projectName} {/* Afficher le nom du projet ici */}
            </h1>
          </div>
          <div className=" mx-5 px-5 pt-5">
            <NavLink
              to="/allprojects"
              className="fs-5 fst-italic text-decoration-none"
              style={{ color: "#7b5844" }}
              onMouseEnter={(e) => {
                e.target.style.fontWeight = "bold";
              }}
              onMouseLeave={(e) => {
                e.target.style.fontWeight = "normal";
              }}
            >
              &#10132; Back to all projects
            </NavLink>
          </div>
        </div>




        <div className="container mt-5 tabletask">
          <div className="row">
            <div className="col-12">
              <table className="table table-striped mt-4 mb-5">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Objectives</th>
                    <th>Person In Charge</th>
                    <th>Start Date</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.taskid}>
                      <td className="fw-bold">{task.taskrole}</td>
                      <td>{task.taskobjective}</td>
                      <td>{task.taskpic}</td>
                      <td>{task.taskstart}</td>
                      <td>{task.taskend}</td>
                      <td
                        className="opstatus fst-italic"
                        style={{
                          fontWeight:
                            task.taskstatus === "Completed" ? "bold" : "normal",
                          color:
                            task.taskstatus === "Completed"
                              ? "#3b798c"
                              : "#7b5844",
                        }}
                      >
                        {task.taskstatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="justify-content-center text-center mt-5">
                <button
                  type="submit"
                  className="btn border-0 mb-5 text-white px-4 py-2 w-25"
                  style={{ backgroundColor: "#3b798c" }}
                  onClick={() => navigate(`/add-task`)} // Redirection vers AddTask.js
                >
                  Add New Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
import { NavLink } from "react-router-dom";

import Menu from "../components/Menu";

export default function OneProject() {
  const data = [];

  const uniqueTaskRoles = {};

  return (
    <div className="w-100 home">
      <div>
        <div className="col-12">
          <Menu />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
              Nature & Me
            </h1>
          </div>
          <div className=" mx-5 px-5 pt-5">
            <NavLink
              to="/allprojects"
              className="fs-5 fst-italic text-decoration-none"
              style={{ color: "#7b5844" }}
              onMouseEnter={(e) => {
                e.target.style.fontWeight = "bold";
              }}
              onMouseLeave={(e) => {
                e.target.style.fontWeight = "normal";
              }}
            >
              &#10132; Back to all projects
            </NavLink>
          </div>
        </div>

        <div className="container mt-5 tabletask">
          <div className="row">
            <div className="col-12">
              <table className="table table-striped mt-4 mb-5">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Objectives</th>
                    <th>Person In Charge</th>
                    <th>Start Date</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((task) => {
                    // If the current task name already exists
                    if (uniqueTaskRoles[task.taskrole]) {
                      // If true, display an empty string
                      return (
                        <tr key={task.taskid}>
                          <td className="fw-bold">{""}</td>
                          <td>{task.taskobjective}</td>
                          <td>{task.taskpic}</td>
                          <td>{task.taskstart}</td>
                          <td>{task.taskend}</td>
                          <td
                            className="opstatus fst-italic"
                            style={{
                              fontWeight:
                                task.taskstatus === "Completed"
                                  ? "bold"
                                  : "normal",
                              color:
                                task.taskstatus === "Completed"
                                  ? "#3b798c"
                                  : "#7b5844",
                            }}
                          >
                            {task.taskstatus}
                          </td>
                        </tr>
                      );
                    } else {
                      // Otherwise, add the task name
                      uniqueTaskRoles[task.taskrole] = true;

                      // Show color based on task status
                      let statusColor = "";
                      if (task.taskstatus === "Completed") {
                        statusColor = "#3b798c";
                      } else if (task.taskstatus === "In Progress") {
                        statusColor = "#7b5844";
                      }

                      return (
                        <tr key={task.taskid}>
                          <td className="ttaskcolor fs-5 fw-bold">
                            <button>{task.taskrole}</button>
                          </td>
                          <td>{task.taskobjective}</td>
                          <td>{task.taskpic}</td>
                          <td>{task.taskstart}</td>
                          <td>{task.taskend}</td>

                          <td
                            className="opstatus fst-italic"
                            style={{
                              fontWeight:
                                task.taskstatus === "Completed"
                                  ? "bold"
                                  : "normal",
                              color: statusColor, // statusColor
                            }}
                          >
                            {task.taskstatus}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>

              <div className="justify-content-center text-center mt-5 ">
                <button
                  type="submit"
                  className="btn border-0 mb-5 text-white px-4 py-2 w-25"
                  style={{ backgroundColor: "#3b798c" }}
                >
                  Add New Objective
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

/*
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu";

export default function OneProject() {
  const { projectId } = useParams(); // Récupérer l'ID du projet depuis l'URL
  const [data, setData] = useState([]); // État pour stocker les données des tâches
  const uniqueTaskRoles = {};

  // Fonction pour charger les données du projet
  const loadProjectData = async () => {
    try {
      const response = await axios.get(`http://localhost:8500/api/get-tasks/${projectId}`); // Adapter l'URL selon votre API
      setData(response.data); // Mettre à jour l'état avec les données récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des données du projet:", error);
    }
  };

  useEffect(() => {
    loadProjectData(); // Charger les données lorsque le composant se monte
  }, [projectId]);

  return (
    <div className="w-100 home">
      <div>
        <div className="col-12">
          <Menu />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}> Nature & Me </h1>
          </div>
          <div className="mx-5 px-5 pt-5">
            <NavLink to="/allprojects" className="fs-5 fst-italic text-decoration-none" style={{ color: "#7b5844" }} onMouseEnter={(e) => { e.target.style.fontWeight = "bold"; }} onMouseLeave={(e) => { e.target.style.fontWeight = "normal"; }}>
              ➔ Back to all projects
            </NavLink>
          </div>
        </div>

        <div className="container mt-5 tabletask">
          <div className="row">
            <div className="col-12">
              <table className="table table-striped mt-4 mb-5">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Objectives</th>
                    <th>Person In Charge</th>
                    <th>Start Date</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((task) => {
                    // If the current task role already exists
                    if (uniqueTaskRoles[task.taskrole]) {
                      return (
                        <tr key={task.taskid}>
                          <td className="fw-bold">{""}</td>
                          <td>{task.taskobjective}</td>
                          <td>{task.taskpic}</td>
                          <td>{task.taskstart}</td>
                          <td>{task.taskend}</td>
                          <td
                            className="opstatus fst-italic"
                            style={{
                              fontWeight: task.taskstatus === "Completed" ? "bold" : "normal",
                              color: task.taskstatus === "Completed" ? "#3b798c" : "#7b5844",
                            }}
                          >
                            {task.taskstatus}
                          </td>
                        </tr>
                      );
                    } else {
                      uniqueTaskRoles[task.taskrole] = true;
                      let statusColor = task.taskstatus === "Completed" ? "#3b798c" : "#7b5844";

                      return (
                        <tr key={task.taskid}>
                          <td className="ttaskcolor fs-5 fw-bold">
                            <button>{task.taskrole}</button>
                          </td>
                          <td>{task.taskobjective}</td>
                          <td>{task.taskpic}</td>
                          <td>{task.taskstart}</td>
                          <td>{task.taskend}</td>
                          <td
                            className="opstatus fst-italic"
                            style={{
                              fontWeight: task.taskstatus === "Completed" ? "bold" : "normal",
                              color: statusColor,
                            }}
                          >
                            {task.taskstatus}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>

              <div className="justify-content-center text-center mt-5 ">
                <button
                  type="submit"
                  className="btn border-0 mb-5 text-white px-4 py-2 w-25"
                  style={{ backgroundColor: "#3b798c" }}
                >
                  Add New Objective
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
