import React, { useEffect, useState } from "react";

const Team = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-users");
        const result = await response.json();

        // Fetch roles for users
        const usersWithRoles = await Promise.all(result.map(async (user) => {
          const roleResponse = await fetch(`http://localhost:8000/api/get-role/${user.user_roleid}`);
          const role = await roleResponse.json();
          return { ...user, rolename: role.rolename };
        }));

        // Group users by role
        const usersByRole = usersWithRoles.reduce((acc, user) => {
          const roleName = user.rolename;
          if (!acc[roleName]) {
            acc[roleName] = [];
          }
          acc[roleName].push(user);
          return acc;
        }, {});

        setData(Object.entries(usersByRole));
      } catch (error) {
        console.error("Error retrieving users :", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 style={{ color: "#7b5844" }}>Our Team</h2>
          <table className="table table-striped mt-4 mb-5 table-responsive border">
            <thead>
              <tr>
                <th className="px-5" style={{ width: "50%" }}>
                  Role
                </th>
                <th className="px-5" style={{ width: "50%" }}>
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(([roleName, users]) =>
                users.map((user, index) => (
                  <tr key={user.userid}>
                    {index === 0 && (
                      <td
                        className="border fw-bold px-5"
                        style={{ color: " #7b5844" }}
                        rowSpan={users.length}
                      >
                        {roleName}
                      </td>
                    )}
                    <td className="border px-5" style={{ color: " #42414d" }}>
                      {user.userpic}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
