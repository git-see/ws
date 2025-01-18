import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

export default function AddTask() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [taskObjective, setTaskObjective] = useState("");
  const [taskStart, setTaskStart] = useState("");
  const [taskEnd, setTaskEnd] = useState("");
  const [userPic, setUserPic] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-project/${projectId}`
        );
        setProjectName(response.data.projectname);
      } catch (error) {
        console.error("Error fetching the project", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    fetchProjectName();
    fetchRoles();
  }, [projectId]);

  useEffect(() => {
    const fetchUsersByRole = async () => {
      if (roleId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/get-users-by-role/${roleId}`
          );
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users", error);
        }
      }
    };

    fetchUsersByRole();
  }, [roleId]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Validate dates and fields
    if (!taskStart || !taskEnd || !roleId || !userPic || !taskObjective) {
      alert("Please fill in all required fields.");
      return;
    }

    if (new Date(taskStart) >= new Date(taskEnd)) {
      alert("The start date must be before the delivery date.");
      return;
    }

    const formattedTaskStart = formatDateTime(taskStart);
    const formattedTaskEnd = formatDateTime(taskEnd);

    const taskData = {
      project_projectid: projectId,
      role_roleid: roleId,
      user_userid: userPic,
      taskobjective: taskObjective,
      taskstart: formattedTaskStart,
      taskend: formattedTaskEnd,
      taskcomment: "",
      taskstatus: "Awaiting",
    };

    try {
      await axios.post("http://localhost:8000/api/add-task", taskData);
      navigate(`/oneproject/${projectId}`);
    } catch (error) {
      console.error("Error adding the task", error);
      alert(
        "Error adding the task: " + error.response?.data || "Unknown error"
      );
    }
  };

  return (
    <div className="w-100">
      <div className="col-12">
        <Menu />
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            {projectName}
          </h1>
        </div>
        <div className="mx-5 px-5 pt-5">
          <NavLink
            to="/allprojects"
            className="fs-5 fst-italic text-decoration-none"
            style={{ color: "#7b5844" }}
          >
            ➔ Back to All projects
          </NavLink>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center px-3">
          <form className="px-5 py-5" onSubmit={handleSubmit}>
            {/* Role */}
            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskrole">
                Role
              </label>
              <select
                className="form-control form-control-lg text-secondary fs-6"
                name="taskrole"
                id="taskrole"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option value="">Select a role &#9207;</option>
                {roles.map((role) => (
                  <option key={role.roleid} value={role.roleid}>
                    {role.rolename}
                  </option>
                ))}
              </select>
            </div>

            {/* Objective */}
            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskobjective">
                Objective
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="taskobjective"
                id="taskobjective"
                value={taskObjective}
                onChange={(e) => setTaskObjective(e.target.value)}
              />
            </div>

            {/* Person In Charge */}
            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="userpic">
                Person In Charge
              </label>
              <select
                className="form-control form-control-lg text-secondary fs-6"
                name="userpic"
                id="userpic"
                value={userPic}
                onChange={(e) => setUserPic(e.target.value)}
              >
                <option value="">Select a colleague &#9207;</option>
                {users.map((user) => (
                  <option key={user.userid} value={user.userid}>
                    {user.userpic}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskstart">
                Start Date
              </label>
              <input
                className="form-control form-control-lg text-secondary fs-6"
                type="datetime-local"
                name="taskstart"
                id="taskstart"
                value={taskStart}
                onChange={(e) => setTaskStart(e.target.value)}
              />
            </div>

            {/* Delivery Date */}
            <div className="form-group mb-4">
              <label className="text-secondary fs-4" htmlFor="taskend">
                Delivery Date
              </label>
              <input
                className="form-control form-control-lg text-secondary fs-6"
                type="datetime-local"
                name="taskend"
                id="taskend"
                value={taskEnd}
                onChange={(e) => setTaskEnd(e.target.value)}
              />
            </div>

            {/* Submit the form */}
            <div className="d-flex justify-content-center">
              <input
                type="submit"
                className="btn border-0 px-3 py-2 mx-3 w-25 text-white text-decoration-none"
                value="Add Task"
                style={{ backgroundColor: "#3b798c" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
