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
    projectstatus: "", // Ajout de projectstatus à l'état pour la mise à jour
    projectcomment: "",
  });

  const navigate = useNavigate();

  // Function to format date to "YYYY-MM-DD HH:MM"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Retrieve data from API before processing it
  const loadproject = async () => {
    const response = await axios.get("http://localhost:8000/api/get");
    setProjects(response.data);
  };

  useEffect(() => {
    loadproject();
  }, []);

  // Edit project
  const startEditing = (project) => {
    setEditingProjectId(project.projectid);
    setEditedProject({
      ...project,
      projectstart: formatDate(project.projectstart),
      projectend: formatDate(project.projectend),
    });
  };

  // Changing input fields while editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Cancel editing and reset editing state
  const cancelEditing = () => {
    setEditingProjectId(null);
  };

  // Save changes
  const saveChanges = async (projectId) => {
    // Ajout de projectstatus dans editedProject pour la mise à jour
    await axios.put(
      `http://localhost:8000/api/update/${projectId}`,
      editedProject
    );
    setEditingProjectId(null);
    loadproject(); // Recharger les projets après la mise à jour
  };

  // Show selected project
  const viewProject = (projectId) => {
    navigate(`/oneproject/${projectId}`);
  };

  return (
    <tbody>
      {projects.map((project) => (
        <tr key={project.projectid}>
          {editingProjectId === project.projectid ? (
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
                  type="datetime-local"
                  name="projectstart"
                  value={editedProject.projectstart}
                  onChange={handleEditChange}
                />
              </td>
              <td>
                <input
                  style={{ color: "#3b798c" }}
                  className="py-1"
                  type="datetime-local"
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
                  value={editedProject.projectstatus} // Utilisation de editedProject pour projectstatus
                  onChange={handleEditChange}
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
              <td className="text-secondary fw-bold">{project.projectname}</td>
              <td className="text-secondary">
                {formatDate(project.projectstart)}
              </td>
              <td className="text-secondary">
                {formatDate(project.projectend)}
              </td>
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
