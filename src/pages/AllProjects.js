import Menu from "../components/Menu";

import ProjectItem from "../components/ProjectItem";

export default function AllProjects() {
  return (
    <div className="allprojects mb-5">
      <div className="bg-titre-list">
        <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>All projects</h1>
      </div>

      <div className="container mt-5">
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
          <ProjectItem />
        </table>
        <div className="justify-content-center text-center mt-5 ">
          <button
            className="btn border-0 text-white px-4 py-2 w-25"
            style={{ backgroundColor: "#3b798c" }}
          >
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
}
