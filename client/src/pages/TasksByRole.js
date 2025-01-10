import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

export default function TasksByRole() {
  const { projectId, roleId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchTasksByRole = async () => {
      // Fetch tasks based on role
      const response = await axios.get(
        `http://localhost:8000/api/get-tasks-by-role/${projectId}/${roleId}`
      );
      setTasks(response.data); // Set tasks from API response

      // Retrieve project and role data
      const projectResponse = await axios.get(
        `http://localhost:8000/api/get-project/${projectId}`
      );
      setProject(projectResponse.data);

      const roleResponse = await axios.get(
        `http://localhost:8000/api/get-role/${roleId}`
      );
      setRole(roleResponse.data);
    };
    fetchTasksByRole();
  }, [projectId, roleId]); // Re-fetch if projectId or roleId changes

  return (
    <div className="w-100">
      <div className="col-12">
        <Menu />
      </div>
      <div className="d-flex justify-content-between mb-4">
        <div>
          {/* Display project name if available */}
          {project && (
            <h1 className="px-5 pb-4" style={{ color: "#7b5844" }}>
              {project.projectname}{" "}
            </h1>
          )}
        </div>
        <div className="pt-5">
          <h2 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            {/* Display role name if available */}
            {role ? role.rolename : ""}
          </h2>
        </div>
        <div className="mx-5 px-5 pt-5 fs-5">
          <NavLink
            to={`/oneproject/${projectId}`}
            className="fs-5 fst-italic text-decoration-none"
            style={{ color: "#7b5844" }}
            onMouseEnter={(e) => {
              e.target.style.fontWeight = "bold";
            }}
            onMouseLeave={(e) => {
              e.target.style.fontWeight = "normal";
            }}
          >
            &#10132; Back To The Project
          </NavLink>
        </div>
      </div>

      <div>
        <div className="container">
          <div className="row">
            {tasks.length > 0 ? ( // Check if there are tasks
              tasks.map((task) => (
                <div
                  className="card-group col-md-4 col-sm-6 col-xs-12 mt-4 mb-5"
                  key={task.taskid} // Unique key for each task
                >
                  <div className="card word-wrap p-2 text-secondary custom-box-shadow">
                    <div className="card-group rounded-3">
                      <h2 className="w-100 p-2 text-secondary fs-3 text-center border border-1 rounded-2 custom-box-shadow">
                        {task.userpic}
                      </h2>
                    </div>
                    <div>
                      <div
                        className="text-center pt-3 pb-4 border-bottom"
                        style={{ color: "#3b798c" }}
                      >
                        {task.taskobjective}
                      </div>
                      <div>
                        <div className="d-flex justify-content-around fw-bold pt-2">
                          <p>Start :</p>
                          <p>Delivery :</p>
                        </div>
                        <div className="d-flex justify-content-between fst-italic ">
                          <p>{task.taskstart}</p>
                          <p>{task.taskend}</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div
                          className="border p-2"
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: "5px",
                          }}
                        >
                          {task.taskcomment}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="card-footer d-flex py-2 mt-4 p-3">
                        <div className="w-50 m-1">
                          <button
                            type="button"
                            className="btn btn-primary border-0 px-3 py-2 w-100"
                            style={{ backgroundColor: "#3b798c" }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="w-50 m-1">
                          <button
                            type="button"
                            className="btn btn-primary border-0 px-3 py-2 w-100"
                            style={{ backgroundColor: "#3b798c" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No tasks available for this role</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
