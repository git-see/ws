import { useState, useEffect } from "react"; // Importation des hooks nécessaires de React
import axios from "axios"; // Importation d'axios pour effectuer des requêtes HTTP
import { useNavigate } from "react-router-dom";

export default function ProjectItem() {
  // État pour contenir la liste des projets
  const [projects, setProjects] = useState([]);
  // État pour suivre quel projet est actuellement en cours d'édition
  const [editingProjectId, setEditingProjectId] = useState(null);
  // État pour contenir les données du projet en cours d'édition
  const [editedProject, setEditedProject] = useState({
    projectname: "",
    projectstart: "",
    projectend: "",
    projectcomment: ""
  });

  const navigate = useNavigate();

  // Fonction pour charger les projets depuis l'API
  const loadProjects = async () => {
    const response = await axios.get("http://localhost:8500/api/get"); // Récupération des projets depuis l'API
    setProjects(response.data); // Mise à jour de l'état avec les projets récupérés
  };

  // useEffect pour charger les projets lorsque le composant est monté
  useEffect(() => {
    loadProjects(); // Appel de loadProjects pour récupérer les projets
  }, []);

  // Fonction pour commencer à éditer un projet spécifique
  const startEditing = (project) => {
    setEditingProjectId(project.projectid); // Définir l'ID du projet en cours d'édition
    setEditedProject(project); // Remplir l'état editedProject avec les données actuelles du projet
  };

  // Fonction pour gérer les changements dans les champs de saisie pendant l'édition
  const handleEditChange = (e) => {
    const { name, value } = e.target; // Destructuration du nom et de la valeur de l'élément cible de l'événement
    setEditedProject(prevState => ({
      ...prevState, // Étendre l'état précédent pour conserver les autres valeurs
      [name]: value // Mettre à jour le champ spécifique qui est modifié
    }));
  };

  // Fonction pour annuler l'édition et réinitialiser l'état d'édition
  const cancelEditing = () => {
    setEditingProjectId(null); // Réinitialiser l'ID du projet en cours d'édition
  };

  // Fonction pour enregistrer les modifications apportées au projet
  const saveChanges = async (projectId) => {
    await axios.put(`http://localhost:8500/api/update/${projectId}`, editedProject); // Envoi des données du projet mises à jour à l'API
    setEditingProjectId(null); // Réinitialiser l'ID du projet en cours d'édition après l'enregistrement
    loadProjects(); // Recharger les projets pour refléter les modifications
  };


  // Fonction pour afficher le projet
  const viewProject = (projectId) => {
    navigate(`/oneproject/${projectId}`); // Redirection vers la page du projet spécifique
  };



  return (
    <tbody>
      {projects.map((project) => (
        <tr key={project.projectid}>
          {editingProjectId === project.projectid ? ( // Vérifier si ce projet est en cours d'édition
            <>
              <td><input style={{ color: "#3b798c" }} className="py-1" type="text" name="projectname" value={editedProject.projectname} onChange={handleEditChange} /></td>
              <td><input style={{ color: "#3b798c" }} className="py-1" type="text" name="projectstart" value={editedProject.projectstart} onChange={handleEditChange} /></td>
              <td><input style={{ color: "#3b798c" }} className="py-1" type="text" name="projectend" value={editedProject.projectend} onChange={handleEditChange} /></td>
              <td><input style={{ color: "#3b798c" }} className="py-1" type="text" name="projectstatus" value={editedProject.projectstatus} readOnly /></td>
              <td><textarea style={{ color: "#3b798c" }} className="py-1"  name="projectcomment" value={editedProject.projectcomment} onChange={handleEditChange} /></td>
              <td className="btn-group">
                <button onClick={() => saveChanges(project.projectid)} className="btn border-0 px-3 py-2 mx-2 w-50 text-white text-decoration-none" style={{ backgroundColor: "#46523f" }}>Save</button>
                <button onClick={cancelEditing} className="btn border-0 px-2 py-2 w-50 text-white text-decoration-none" style={{ backgroundColor: "#aa5c55" }}>Cancel</button>
              </td>
            </>
          ) : (
            <>
              <td className="text-secondary">{project.projectname}</td>
              <td className="text-secondary">{project.projectstart}</td>
              <td className="text-secondary">{project.projectend}</td>
              <td className="fst-italic" style={{ fontWeight: project.projectstatus === "Completed" ? "bold" : "normal", color: project.projectstatus === "Completed" ? "#3b798c" : "#7b5844" }} >
                {project.projectstatus}
              </td>
              <td className="text-secondary">{project.projectcomment}</td>
              <td className="btn-group">
                <button onClick={() => startEditing(project)} className="btn border-0 px-3 py-2 mx-2 w-50 text-white text-decoration-none" style={{ backgroundColor: "#3b798c" }}>Edit</button>
                <button onClick={() => viewProject(project.projectid)} className="btn border-0 px-3 py-2 mx-2 w-50 text-white text-decoration-none" style={{ backgroundColor: "#3b798c" }}>View</button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
}










/*
en anglais:

import { useState, useEffect } from "react"; // Importing necessary hooks from React
import axios from "axios"; // Importing axios for making HTTP requests

export default function ProjectItem() {
  // State to hold the list of projects
  const [projects, setProjects] = useState([]);
  // State to track which project is currently being edited
  const [editingProjectId, setEditingProjectId] = useState(null);
  // State to hold the data of the project being edited
  const [editedProject, setEditedProject] = useState({
    projectname: "",
    projectstart: "",
    projectend: "",
    projectcomment: ""
  });

  // Function to load projects from the API
  const loadProjects = async () => {
    const response = await axios.get("http://localhost:8500/api/get"); // Fetching projects from the API
    setProjects(response.data); // Updating the state with the fetched projects
  };

  // useEffect to load projects when the component mounts
  useEffect(() => {
    loadProjects(); // Call loadProjects to fetch projects
  }, []);

  // Function to start editing a specific project
  const startEditing = (project) => {
    setEditingProjectId(project.projectid); // Set the ID of the project being edited
    setEditedProject(project); // Populate the editedProject state with the project's current data
  };

  // Function to handle changes in the input fields during editing
  const handleEditChange = (e) => {
    const { name, value } = e.target; // Destructuring the event target's name and value
    setEditedProject(prevState => ({
      ...prevState, // Spread the previous state to retain other values
      [name]: value // Update the specific field being changed
    }));
  };

  // Function to cancel editing and reset the editing state
  const cancelEditing = () => {
    setEditingProjectId(null); // Reset the editing project ID
  };

  // Function to save changes made to the project
  const saveChanges = async (projectId) => {
    await axios.put(`http://localhost:8500/api/update/${projectId}`, editedProject); // Sending updated project data to the API
    setEditingProjectId(null); // Reset the editing project ID after saving
    loadProjects(); // Reload projects to reflect changes
  };

  return (
    <tbody>
      {projects.map((project) => (
        <tr key={project.projectid}>
          {editingProjectId === project.projectid ? ( // Check if this project is being edited
            <>
              <td><input type="text" name="projectname" value={editedProject.projectname} onChange={handleEditChange} /></td>
              <td><input type="text" name="projectstart" value={editedProject.projectstart} onChange={handleEditChange} /></td>
              <td><input type="text" name="projectend" value={editedProject.projectend} onChange={handleEditChange} /></td>
              <td><input type="text" name="projectstatus" value={editedProject.projectstatus} readOnly /></td>
              <td><textarea name="projectcomment" value={editedProject.projectcomment} onChange={handleEditChange} /></td>
              <td>
                <button onClick={() => saveChanges(project.projectid)} className="btn btn-success">Save</button>
                <button onClick={cancelEditing} className="btn btn-danger">Cancel</button>
              </td>
            </>
          ) : (
            <>
              <td className="text-secondary">{project.projectname}</td>
              <td className="text-secondary">{project.projectstart}</td>
              <td className="text-secondary">{project.projectend}</td>
              <td className="fst-italic" style={{ fontWeight: project.projectstatus === "Completed" ? "bold" : "normal", color: project.projectstatus === "Completed" ? "#3b798c" : "#7b5844" }} >
                {project.projectstatus}
              </td>
              <td className="text-secondary">{project.projectcomment}</td>
              <td>
                <button onClick={() => startEditing(project)} className="btn btn-primary">Edit</button>
                <button className="btn btn-secondary">View</button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
}
*/




/*
import { useState, useEffect } from "react";

import axios from "axios";

export default function ProjectItem() {
  const [project, setProject] = useState([]);

  // Retrieve data from API before processing it
  const loadproject = async () => {
    // Store the result of the HTTP GET request
    // Wait for the Axios query to complete
    const response = await axios.get("http://localhost:8500/api/get");
    // Store data :
    setProject(response.data);
  };

  useEffect(() => {
    loadproject();
  }, []);

  return (
    <tbody>
      {project.map((project) => (
        <tr key={project.projectid}>
          {" "}
          <td className="text-secondary">{project.projectname}</td>
          <td className="text-secondary">{project.projectstart}</td>
          <td className="text-secondary">{project.projectend}</td>
          <td
            className="fst-italic"
            style={{
              fontWeight:
                project.projectstatus === "Completed" ? "bold" : "normal",
              color:
                project.projectstatus === "Completed" ? "#3b798c" : "#7b5844",
            }}
          >
            {project.projectstatus}
          </td>
          <td className="text-secondary">{project.projectcomment}</td>
          <td className="btn-group">
            <input
              type="submit"
              className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
              value="Edit"
              style={{ backgroundColor: "#3b798c" }}
            ></input>
            <input
              type="submit"
              className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
              value="View"
              style={{ backgroundColor: "#3b798c" }}
            ></input>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
*/