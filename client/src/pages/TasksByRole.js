import { NavLink } from "react-router-dom";

import Menu from "../components/Menu";

export default function OneTask() {
  const data = [];

  return (
    <div className="w-100">
      <div className="col-12">
        <Menu />
      </div>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            Dévelopment :
          </h1>
        </div>
        <div className=" mx-5 px-5 pt-5 fs-5">
          <NavLink
            to="/allprojects/:id"
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
        <div class="container">
          <div class="row">
            {data.map((task) => (
              <div class="col-md-4 col-sm-6 col-xs-12 mt-4 mb-5">
                <div className="card word-wrap p-2 text-secondary custom-box-shadow">
                  <div className="rounded-3">
                    <div key={task.taskid}>
                      <h2 className="p-2 text-secondary fs-3 text-center border border-1 rounded-2 custom-box-shadow">
                        {task.taskpic}
                      </h2>
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
                      <p className="text-justify my-3">{task.taskcomment}</p>
                      <p>
                        <div className="container mt-5 mb-4">
                          <div className="form-group d-flex justify-content-around">
                            <div className="form-check">
                              <input
                                className="form-check-input border border-1 border-secondary"
                                type="radio"
                                name="exampleRadios"
                                id="option1"
                                value="option1"
                              />
                              <label className="form-check-label" for="option1">
                                In progress
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input border border-1 border-secondary"
                                type="radio"
                                name="exampleRadios"
                                id="option2"
                                value="option2"
                              />
                              <label className="form-check-label" for="option2">
                                Completed
                              </label>
                            </div>
                          </div>
                        </div>
                      </p>
                      <div className="d-flex py-2 mt-4">
                        <div className="w-50 m-1">
                          <button
                            type="submit"
                            className="btn btn-primary border-0 px-3 py-2 w-100"
                            style={{ backgroundColor: "#3b798c" }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="w-50 m-1">
                          <button
                            type="submit"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
