const CurrentProjects = () => {
  const data = [];

  return (
    <div>
      <div className="mx-3">
        <h2>Current Projects</h2>
      </div>
      <div className="d-flex justify-content-center">
        <div className="container mt-4 pt-2">
          <div className="row">
            {data.map((project) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
                key={project.projectid}
              >
                <div className="card word-wrap p-2 text-secondary custom-box-shadow custom-card d-flex flex-column h-100">
                  <h2
                    className="py-3 fs-4 text-center border-bottom"
                    style={{ color: "#7b5844" }}
                  >
                    {project.projectname}
                  </h2>
                  <div className="d-flex justify-content-between mt-3 mx-3">
                    <p>Delivery date :</p>
                    <p style={{ color: "#7b5844" }}>{project.projectend}</p>
                  </div>
                  <p className="text-justify my-3 mx-3">
                    {" "}
                    {project.projectcomment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentProjects;
