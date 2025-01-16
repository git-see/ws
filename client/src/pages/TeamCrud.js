import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";

export default function TeamCrud() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ rolename: "", userpic: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null); // To hold user being edited
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

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

  // -------------------------- CREATE / UDPDATE ---------------------------------
  const handleAddColleague = () => {
    setShowForm(true);
  };

  // Handle input changes for both adding and editing users
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditUser({ ...editUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  // Handle form submission for adding or updating users
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Handle user update
      try {
        const response = await fetch(
          `http://localhost:8000/api/update-user/${editUser.userid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editUser),
          }
        );

        if (!response.ok) throw new Error("Error updating user");

        setIsEditing(false);
        setEditUser(null);
        await fetchUsers();
      } catch (error) {
        console.error("Error updating user :", error);
      }
    } else {
      // Handle user addition
      if (!newUser.rolename || !newUser.userpic) return; // Validate input

      try {
        const response = await fetch("http://localhost:8000/api/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) throw new Error("Error adding user");

        setShowForm(false); // Hide form after submission
        setNewUser({ rolename: "", userpic: "" });
        await fetchUsers(); // Fetch updated user list
      } catch (error) {
        console.error("Error adding user :", error);
      }
    }
  };

  // Cancel adding or editing
  const handleCancel = () => {
    setShowForm(false); // Hide form after cancel
    setNewUser({ rolename: "", userpic: "" });
    setIsEditing(false);
    setEditUser(null);
  };

  // Initialize editing state for a user
  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditUser(user);
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

      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user :", error);
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/api/get-users");
    const result = await response.json();
    const usersByRole = result.reduce((acc, user) => {
      const roleName = user.rolename;
      if (!acc[roleName]) {
        acc[roleName] = [];
      }
      acc[roleName].push(user);
      return acc;
    }, {});
    setData(Object.entries(usersByRole));
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
                  value={isEditing ? editUser.rolename : newUser.rolename}
                  onChange={handleChange}
                  required
                  placeholder="Role"
                  className="form-control text-secondary mb-2"
                />
                <input
                  type="text"
                  name="userpic"
                  value={isEditing ? editUser.userpic : newUser.userpic}
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
                  {isEditing ? "Update User" : "Add User"}
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
                    {users.map((user, index) => (
                      <tr key={user.userid}>
                        {index === 0 && (
                          <td
                            className="text-secondary fs-5"
                            rowSpan={users.length}
                          >
                            {roleName}
                          </td>
                        )}
                        {isEditing && editUser.userid === user.userid ? (
                          <>
                            <td className="text-secondary">
                              <input
                                className="py-1 border w-100"
                                style={{ color: "#3b798c" }}
                                type="text"
                                name="userpic"
                                value={editUser.userpic}
                                onChange={handleChange}
                                required
                              />
                            </td>
                            <td className="btn-group text-center w-100">
                              <input
                                type="submit"
                                className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                                value="Save"
                                onClick={handleSubmit}
                                style={{ backgroundColor: "#3b798c" }}
                              />
                              <button
                                className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                                onClick={() => setIsEditing(false)}
                                style={{ backgroundColor: "#aa5c55" }}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="text-secondary">{user.userpic}</td>
                            <td className="btn-group text-center w-100">
                              <input
                                className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                                value="Edit"
                                style={{ backgroundColor: "#3b798c" }}
                                onClick={() => handleEditUser(user)}
                              />
                              <input
                                type="button"
                                className="btn border-0 px-3 py-2 mx-2 w-25 text-white text-decoration-none w-50"
                                value="Delete"
                                style={{ backgroundColor: "#3b798c" }}
                                onClick={() =>
                                  handleDeleteUser(user.userid, roleName)
                                }
                              />
                            </td>
                          </>
                        )}
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
