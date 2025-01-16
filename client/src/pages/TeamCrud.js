import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";

export default function TeamCrud() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ rolename: "", userpic: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-users");
        const result = await response.json();

        // -------------------------- READ---------------------------------
        // Group users by role
        const usersByRole = result.reduce((acc, user) => {
          const roleName = user.rolename;
          if (!acc[roleName]) {
            acc[roleName] = []; // Initialize array if role doesn't exist
          }
          acc[roleName].push(user); // Add user to corresponding role
          return acc;
        }, {});

        // Convert the object to an array for display
        setData(Object.entries(usersByRole));
      } catch (error) {
        console.error("Error retrieving users :", error);
      }
    };

    fetchUsers();
  }, []);

  // -------------------------- CREATE---------------------------------
  const handleAddColleague = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.rolename || !newUser.userpic) return; // Exit if required fields are empty

    try {
      const response = await fetch("http://localhost:8000/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const result = await response.text();
      console.log(result);

      // Re-fetch users after adding a new colleague
      setShowForm(false); // Hide the form after submission
      setNewUser({ rolename: "", userpic: "" });
      // Re-fetch users to update the list
      const fetchUsers = async () => {
        const response = await fetch("http://localhost:8000/api/get-users");
        const result = await response.json();
        const usersByRole = result.reduce((acc, user) => {
          const roleName = user.rolename;
          if (!acc[roleName]) {
            acc[roleName] = [];
          }
          acc[roleName].push(user); // Group users by role again
          return acc;
        }, {});
        setData(Object.entries(usersByRole));
      };
      fetchUsers();
    } catch (error) {
      console.error("Error adding user :", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Hide the form
    setNewUser({ rolename: "", userpic: "" }); // Reset the form
  };

  // -------------------------- DELETE---------------------------------
  const handleDeleteUser = async (userId, roleName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete-user/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting user");
      }

      // After successful deletion,, re-fetch users after deletion
      const fetchUsers = async () => {
        const response = await fetch("http://localhost:8000/api/get-users");
        const result = await response.json();
        // Group users by role again after deletion.
        const usersByRole = result.reduce((acc, user) => {
          const roleName = user.rolename;
          if (!acc[roleName]) {
            acc[roleName] = [];
          }
          acc[roleName].push(user);
          return acc;
        }, {});
        // Update the state with the new users data
        setData(Object.entries(usersByRole));
      };

      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user :", error);
    }
  };

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
                onClick={handleAddColleague}
                className="btn border-0 text-white px-4 py-2 w-25"
                style={{ backgroundColor: "#3b798c" }}
              >
                Add A Colleague
              </button>
            </div>
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="mb-4 w-100 d-flex justify-content-center"
              >
                <input
                  type="text"
                  name="rolename"
                  value={newUser.rolename}
                  onChange={handleChange}
                  required
                  placeholder="Role"
                  className="form-control text-secondary mb-2"
                />
                <input
                  type="text"
                  name="userpic"
                  value={newUser.userpic}
                  onChange={handleChange}
                  required
                  placeholder="Colleague"
                  className="form-control text-secondary mb-2"
                />
                <button
                  type="submit"
                  className="btn border-0 mx-2 w-25 text-white"
                  style={{ backgroundColor: "#3b798c" }}
                >
                  Add User
                </button>
                <button
                  onClick={handleCancel}
                  className="btn border-0 px-2 py-2 w-25 text-white text-decoration-none"
                  style={{ backgroundColor: "#aa5c55" }}
                >
                  Cancel
                </button>
              </form>
            )}
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
                  <React.Fragment key={roleName}>
                    <tr>
                      <td
                        className="text-secondary fs-5"
                        rowSpan={users.length}
                      >
                        {roleName}
                      </td>
                      {/* Display the 1st colleague in the same line */}
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
                          onClick={() =>
                            handleDeleteUser(users[0].userid, roleName)
                          }
                        />
                      </td>
                    </tr>
                    {users.slice(1).map((user) => (
                      <tr key={user.userid}>
                        <td className="text-secondary">{user.userpic}</td>
                        <td className="btn-group text-center w-100">
                          <input
                            className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                            value="Edit"
                            style={{ backgroundColor: "#3b798c" }}
                          />
                          <input
                            className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                            value="Delete"
                            style={{ backgroundColor: "#3b798c" }}
                            onClick={() =>
                              handleDeleteUser(user.userid, roleName)
                            }
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
