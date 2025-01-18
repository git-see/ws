import { NavLink } from "react-router-dom";
import Menu from "../components/Menu";
import ProjectItem from "../components/ProjectItem";

export default function AllProjects() {
  // Function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0]; // Get the date part only (YYYY-MM-DD)
    const formattedTime = date.toTimeString().split(" ")[0].slice(0, 5); // Get the time part only (HH:MM)
    return `${formattedDate} ${formattedTime}`; // Combine date and time
  };

  return (
    <div className="w-100">
      <div>
        <div className="col-12">
          <Menu />
        </div>
        <div>
          <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            All projects
          </h1>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="justify-content-center text-center mb-5 pb-2">
              <NavLink
                to="/add-project"
                className="btn border-0 text-white px-4 py-2 w-25"
                style={{ backgroundColor: "#3b798c" }}
              >
                Add New Project
              </NavLink>
            </div>
            <table className="table table-striped mt-4 mb-5">
              <thead>
                <tr>
                  <th className="pb-4">Project Name</th>
                  <th className="pb-4">Start Date</th>
                  <th className="pb-4">End Date</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Comment</th>
                  <th className="px-5 pb-4">Action</th>
                </tr>
              </thead>
              <ProjectItem formatDateTime={formatDateTime} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
