import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentProjects = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const response = await axios.get("http://localhost:8000/api/get");
      // Filtrer les projets avec une date d'échéance supérieure ou égale à aujourd'hui
      const today = new Date();
      const filteredProjects = response.data.filter(project => new Date(project.projectend) >= today);
      setData(filteredProjects);
    };

    loadProjects();
  }, []);

  return (
    <div>
      <div className="mx-3">
        <h2 style={{ color: "#7b5844" }}>Current Projects</h2>
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
                  <div className="d-flex justify-content-center mx-3">
                    <p className="mx-2 border-bottom py-3">Delivery date :</p>
                    <p className="border-bottom py-3" style={{ color: "#7b5844" }}>{project.projectend}</p>
                  </div>
                  <p className="text-justify my-3 mx-3">
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
