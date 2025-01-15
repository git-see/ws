import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

export default function TasksByRole() {
  const { projectId, roleId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState();
  const [role, setRole] = useState();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    taskstart: "",
    taskend: "",
    taskcomment: "",
  });
  const [confirmDeleteTaskId, setConfirmDeleteTaskId] = useState(null);

  useEffect(() => {
    const fetchTasksByRole = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/get-tasks-by-role/${projectId}/${roleId}`
      );
      setTasks(response.data);

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
  }, [projectId, roleId]);

  // Update
  const startEditing = (task) => {
    setEditingTaskId(task.taskid);
    setEditedTask({
      taskstart: task.taskstart,
      taskend: task.taskend,
      taskcomment: task.taskcomment,
    });
    setConfirmDeleteTaskId(null); // Reset delete confirmation
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevState) => ({ ...prevState, [name]: value }));
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  const saveChanges = async (taskId) => {
    await axios.put(
      `http://localhost:8000/api/update-task/${taskId}`,
      editedTask
    );
    setEditingTaskId(null);
    const response = await axios.get(
      `http://localhost:8000/api/get-tasks-by-role/${projectId}/${roleId}`
    );
    setTasks(response.data);
  };

  // Delete with condition (irreversible)
  const handleDeleteClick = (taskId) => {
    setConfirmDeleteTaskId(taskId);
    setEditingTaskId(null); // Reset editing task
  };

  const confirmDelete = async () => {
    await axios.delete(
      `http://localhost:8000/api/delete-task/${confirmDeleteTaskId}`
    );
    const response = await axios.get(
      `http://localhost:8000/api/get-tasks-by-role/${projectId}/${roleId}`
    );
    setTasks(response.data);
    setConfirmDeleteTaskId(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteTaskId(null);
  };

  return (
    <div className="w-100">
      <div className="col-12">
        <Menu />
      </div>
      <div className="d-flex justify-content-between mb-4">
        <div>
          {project && (
            <h1 className="px-5 pb-4" style={{ color: "#7b5844" }}>
              {project.projectname}
            </h1>
          )}
        </div>
        <div className="pt-5">
          <h2 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            {role ? role.rolename : ""}
          </h2>
        </div>
        <div className="mx-5 px-5 pt-5 fs-5">
          <NavLink
            to={`/oneproject/${projectId}`}
            className="fs-5 fst-italic text-decoration-none"
            style={{ color: "#7b5844" }}
          >
            ➔ Back To The Project
          </NavLink>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="row">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  className="card-group col-md-4 col-sm-6 col-xs-12 mt-4 mb-5"
                  key={task.taskid}
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
                        <div className="d-flex justify-content-between fst-italic">
                          {editingTaskId === task.taskid ? (
                            <>
                              <input
                                style={{ color: "#3b798c" }}
                                className="py-1"
                                type="text"
                                name="taskstart"
                                value={editedTask.taskstart}
                                onChange={handleEditChange}
                              />
                              <input
                                style={{ color: "#3b798c" }}
                                className="py-1"
                                type="text"
                                name="taskend"
                                value={editedTask.taskend}
                                onChange={handleEditChange}
                              />
                            </>
                          ) : (
                            <>
                              <p>{task.taskstart}</p>
                              <p>{task.taskend}</p>
                            </>
                          )}
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
                          {editingTaskId === task.taskid ? (
                            <textarea
                              style={{ color: "#3b798c" }}
                              className="py-1"
                              name="taskcomment"
                              value={editedTask.taskcomment}
                              onChange={handleEditChange}
                            />
                          ) : (
                            task.taskcomment
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card-footer d-flex justify-content-around py-2 mt-4 p-3">
                        <div className="w-100 d-flex justify-content-around">
                          {editingTaskId === task.taskid ? (
                            <>
                              <button
                                type="button"
                                className="btn border-0 mx-2 px-3 py-2 w-100 text-white"
                                style={{ backgroundColor: "#46523f" }}
                                onClick={() => saveChanges(task.taskid)}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn border-0 px-2 py-2 w-100 text-white"
                                style={{ backgroundColor: "#aa5c55" }}
                                onClick={cancelEditing}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn text-white mx-1 border-0 px-3 py-2 w-100"
                                style={{ backgroundColor: "#3b798c" }}
                                onClick={() => startEditing(task)}
                              >
                                Edit
                              </button>
                              {confirmDeleteTaskId !== task.taskid && ( // Show Delete button only if not confirming delete
                                <button
                                  type="button"
                                  className="btn text-white mx-1 border-0 px-3 py-2 w-100"
                                  style={{ backgroundColor: "#3b798c" }}
                                  onClick={() => handleDeleteClick(task.taskid)}
                                >
                                  Delete
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      {confirmDeleteTaskId === task.taskid && (
                        <div className="text-danger text-center">
                          Are you sure?
                          <br />
                          Be careful, this action is irreversible!
                          <div className="d-flex justify-content-around my-3">
                            <button
                              className="btn text-white px-5"
                              style={{ backgroundColor: "#aa5c55" }}
                              onClick={confirmDelete}
                            >
                              Yes
                            </button>
                            <button
                              className="btn text-white px-5"
                              style={{ backgroundColor: "#3b798c" }}
                              onClick={cancelDelete}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}
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
