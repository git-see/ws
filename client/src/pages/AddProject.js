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
        projectstart,
        projectend,
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
                  className="form-control form-control-lg"
                  type="text"
                  name="projectstart"
                  id="projectstart"
                  // Accept years from 2020 to 2099
                  //pattern="^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20[0-9]{2})\s([01][0-9]|2[0-3]):([0-5][0-9])$"
                  onChange={(e) => setProjectstart(e.target.value)}
                  value={projectstart}
                  required
                />
                <small className="text-secondary fst-italic">
                  dd/mm/yyyy <strong>hh:mm</strong>
                </small>
              </div>

              <div className="form-group mb-4">
                <label className="text-secondary fs-4" htmlFor="projectend">
                  Delivery Date
                </label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="projectend"
                  id="projectend"
                  // Accepter les années de 2020 à 2099
                  //pattern="^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20[0-9]{2})\s([01][0-9]|2[0-3]):([0-5][0-9])$"
                  onChange={(e) => setProjectend(e.target.value)}
                  value={projectend}
                  required
                />
                <small className="text-secondary fst-italic">
                  dd/mm/yyyy <strong>hh:mm</strong>
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
