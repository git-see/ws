import { useState, useEffect } from "react";

import axios from "axios";

export default function ProjectItem(props) {
  const [project, setProject] = useState([]);

  // Retrieve data from API before processing it
  const loadproject = async () => {
    // Store the result of the HTTP GET request / Wait for the Axios query to complete
    const response = await axios.get("http://localhost:8000/api/get");
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
