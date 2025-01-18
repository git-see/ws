import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

export default function AddProject() {
  const [projectname, setProjectname] = useState("");
  const [projectstart, setProjectstart] = useState("");
  const [projectend, setProjectend] = useState("");
  const [projectcomment, setProjectcomment] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent page reloading
    axios
      .post("http://localhost:8000/api/post", {
        projectname,
        projectstart: formatDate(projectstart),
        projectend: formatDate(projectend),
        projectcomment,
      })
      .then((response) => {
        if (response.status === 200) {
          // Check if the response is successful
          setProjectname("");
          setProjectstart("");
          setProjectend("");
          setProjectcomment("");
          navigate("/allprojects"); // Redirect user to AllProjects.js after adding
        }
      })
      .catch((error) => {
        console.error("There was an error adding the project !", error);
      });
  };

  // Function to format date and time to "YYYY-MM-DD HH:MM"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0]; // Get the date part only (YYYY-MM-DD)
    const formattedTime = date.toTimeString().split(" ")[0].slice(0, 5); // Get the time part only (HH:MM)
    return `${formattedDate} ${formattedTime}`; // Combine date and time
  };

  return (
    <div className="w-100">
      <div className="col-12">
        <Menu />
      </div>
      <div>
        <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
          Add New Project
        </h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="px-5 py-5" onSubmit={handleClick}>
              <div className="form-group mb-4">
                <label className="text-secondary fs-4" htmlFor="projectname">
                  Project Name
                </label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="projectname"
                  id="projectname"
                  onChange={(e) => setProjectname(e.target.value)}
                  value={projectname}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="text-secondary fs-4" htmlFor="projectstart">
                  Start Date
                </label>
                <input
                  style={{ color: "#3b798c" }}
                  className="form-control form-control-lg fs-6 py-1"
                  type="datetime-local"
                  name="projectstart"
                  id="projectstart"
                  onChange={(e) => setProjectstart(e.target.value)}
                  value={projectstart}
                  required
                />
                <small className="text-secondary fst-italic">
                  <strong>dd/mm/yyyy</strong> hh:mm
                </small>
              </div>

              <div className="form-group mb-4">
                <label className="text-secondary fs-4" htmlFor="projectend">
                  Delivery Date
                </label>
                <input
                  style={{ color: "#3b798c" }}
                  className="form-control form-control-lg fs-6 py-1"
                  type="datetime-local"
                  name="projectend"
                  id="projectend"
                  onChange={(e) => setProjectend(e.target.value)}
                  value={projectend}
                  required
                />
                <small className="text-secondary fst-italic">
                  <strong>dd/mm/yyyy</strong> hh:mm
                </small>
              </div>

              <div>
                <label className="text-secondary fs-4" htmlFor="projectcomment">
                  Comment
                </label>
                <textarea
                  className="form-control form-control-lg mb-5"
                  name="projectcomment"
                  id="projectcomment"
                  onChange={(e) => setProjectcomment(e.target.value)}
                  value={projectcomment}
                  cols="30"
                  rows="2"
                ></textarea>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn border-0 px-3 py-4 mx-3 w-25 text-white text-decoration-none"
                  style={{ backgroundColor: "#3b798c" }}
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
