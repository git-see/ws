import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function ProjectItem(props) {
  const [projects, setProjects] = useState([]);

  // State: project currently being edited
  const [editingProjectId, setEditingProjectId] = useState(null);
  // State to store the data being edited
  const [editedProject, setEditedProject] = useState({
    projectname: "",
    projectstart: "",
    projectend: "",
    projectcomment: "",
  });

  const navigate = useNavigate();

  // Retrieve data from API before processing it
  const loadproject = async () => {
    // Store the result of the HTTP GET request / Wait for the Axios query to complete
    const response = await axios.get("http://localhost:8000/api/get");
    setProjects(response.data);
  };

  useEffect(() => {
    loadproject();
  }, []);

  // // Edit project
  const startEditing = (project) => {
    setEditingProjectId(project.projectid);
    setEditedProject(project);
  };

  // Changing input fields while editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevState) => ({
      ...prevState, // Extend the previous state to preserve the other values
      [name]: value,
    }));
  };

  // Cancel editing and reset editing state
  const cancelEditing = () => {
    setEditingProjectId(null); // Reset the ID of the currently edited project
  };

  // Save changes
  const saveChanges = async (projectId) => {
    await axios.put(
      `http://localhost:8000/api/update/${projectId}`,
      editedProject
    ); // Sending modified data to the API
    setEditingProjectId(null); // Reset project ID after saving
    loadproject(); // Reload projects with changes
  };

  // Show selected project
  const viewProject = (projectId) => {
    navigate(`/oneproject/${projectId}`);
  };

  return (
    <tbody>
      {projects.map((project) => (
        <tr key={project.projectid}>
          {editingProjectId === project.projectid ? ( // Check if this project is being modified
            <>
              <td>
                <input
                  style={{ color: "#3b798c" }}
                  className="py-1"
                  type="text"
                  name="projectname"
                  value={editedProject.projectname}
                  onChange={handleEditChange}
                />
              </td>
              <td>
                <input
                  style={{ color: "#3b798c" }}
                  className="py-1"
                  type="text"
                  name="projectstart"
                  value={editedProject.projectstart}
                  onChange={handleEditChange}
                />
              </td>
              <td>
                <input
                  style={{ color: "#3b798c" }}
                  className="py-1"
                  type="text"
                  name="projectend"
                  value={editedProject.projectend}
                  onChange={handleEditChange}
                />
              </td>
              <td>
                <input
                  style={{ color: "#3b798c" }}
                  className="py-1"
                  type="text"
                  name="projectstatus"
                  value={editedProject.projectstatus}
                  readOnly
                />
              </td>
              <td>
                <textarea
                  style={{ color: "#3b798c" }}
                  className="py-1"
                  name="projectcomment"
                  value={editedProject.projectcomment}
                  onChange={handleEditChange}
                />
              </td>
              <td className="btn-group">
                <button
                  onClick={() => saveChanges(project.projectid)}
                  className="btn border-0 px-3 py-2 mx-2 w-50 text-white text-decoration-none"
                  style={{ backgroundColor: "#46523f" }}
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="btn border-0 px-2 py-2 w-50 text-white text-decoration-none"
                  style={{ backgroundColor: "#aa5c55" }}
                >
                  Cancel
                </button>
              </td>
            </>
          ) : (
            <>
              <td className="text-secondary">{project.projectname}</td>
              <td className="text-secondary">{project.projectstart}</td>
              <td className="text-secondary">{project.projectend}</td>
              <td
                className="fst-italic"
                style={{
                  fontWeight:
                    project.projectstatus === "Completed" ? "bold" : "normal",
                  color:
                    project.projectstatus === "Completed"
                      ? "#3b798c"
                      : "#7b5844",
                }}
              >
                {project.projectstatus}
              </td>
              <td className="text-secondary">{project.projectcomment}</td>
              <td className="btn-group">
                <button
                  onClick={() => startEditing(project)}
                  className="btn border-0 px-3 py-2 mx-2 w-50 text-white text-decoration-none"
                  style={{ backgroundColor: "#3b798c" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => viewProject(project.projectid)}
                  className="btn border-0 px-3 py-2 mx-2 w-50 text-white text-decoration-none"
                  style={{ backgroundColor: "#3b798c" }}
                >
                  View
                </button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
}
