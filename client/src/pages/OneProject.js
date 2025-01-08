import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

import axios from "axios";
import Menu from "../components/Menu";

export default function OneProject() {
  const { projectId } = useParams(); // Retrieve project ID from URL
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/get-tasks/${projectId}`
      );
      setTasks(response.data);
      if (response.data.length > 0) {
        setProjectName(response.data[0].projectname); // Retrieve project name from first task
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
              {projectName}
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
                  onClick={() => navigate(`/add-task`)}
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
