import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";

export default function TeamCrud() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-users");
        const result = await response.json();

        // Group users by role
        const usersByRole = result.reduce((acc, user) => {
          const roleName = user.rolename;
          if (!acc[roleName]) {
            acc[roleName] = [];
          }
          acc[roleName].push(user);
          return acc;
        }, {});

        // Convert the object to an array for display
        setData(Object.entries(usersByRole));
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-100">
      <div>
        <div className="col-12">
          <Menu />
        </div>
        <div>
          <h1 className="px-5 pt-5 pb-4" style={{ color: "#7b5844" }}>
            Team Composition
          </h1>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="justify-content-center text-center mb-5 pb-2">
              <button
                className="btn border-0 text-white px-4 py-2 w-25"
                style={{ backgroundColor: "#3b798c" }}
              >
                Add A Colleague
              </button>
            </div>
            <table className="table table-striped mx-5 mt-4 mb-5">
              <thead>
                <tr style={{ width: "40%" }}>
                  <th>Role</th>
                  <th style={{ width: "40%" }}>Name</th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map(([roleName, users]) => (
                  //  React.fragment: Group the table rows for each role
                  <React.Fragment key={roleName}>
                    <tr>
                      {/* Display the role name -> rowSpan to merge the cells in the column */}
                      <td
                        className="text-secondary fs-5"
                        rowSpan={users.length}
                      >
                        {roleName}
                      </td>
                      {/* Display the first user in the table */}
                      <td className="text-secondary">{users[0].userpic}</td>
                      <td className="btn-group text-center w-100">
                        <input
                          type="submit"
                          className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                          value="Edit"
                          style={{ backgroundColor: "#3b798c" }}
                        />
                        <input
                          type="submit"
                          className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                          value="Delete"
                          style={{ backgroundColor: "#3b798c" }}
                        />
                      </td>
                    </tr>
                    {/* Loop through remaining users (skip first user already displayed) */}
                    {users.slice(1).map((user) => (
                      <tr key={user.userid}>
                        <td className="text-secondary">{user.userpic}</td>
                        <td className="btn-group text-center w-100">
                          <input
                            type="submit"
                            className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                            value="Edit"
                            style={{ backgroundColor: "#3b798c" }}
                          />
                          <input
                            type="submit"
                            className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                            value="Delete"
                            style={{ backgroundColor: "#3b798c" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
