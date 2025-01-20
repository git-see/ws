import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userpic, setUserpic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rolename, setRolename] = useState("");
  const [newRoleName, setNewRoleName] = useState("");
  const [roles, setRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch roles from the database
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get-roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError("Could not fetch roles.");
      }
    };
    fetchRoles();
  }, []);

  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!userpic || !password || (!rolename && !newRoleName)) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/add-user", {
        userpic: userpic,
        password: password,
        rolename: newRoleName || rolename, // Use the new role name if provided
      });

      // Reset fields after success
      setUserpic("");
      setPassword("");
      setRolename("");
      setNewRoleName("");
      setError("");
      setSuccessMessage("Member created successfully!");
    } catch (error) {
      console.error(error);
      setError(
        "Error creating member! " + (error.response?.data?.message || "")
      );
      setSuccessMessage("");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      // Logic to update user
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la mise à jour de l'utilisateur !");
    }
  };

  return (
    <div className="container mt-5 py-5">
      <div className="row">
        <div className="col-12">
          <div
            className="d-flex justify-content-between mb-5"
            style={{ color: "#7b5844" }}
          >
            <h1>ADMINISTRATOR space</h1>
            <div>
              <NavLink
                to="/"
                className="fs-5 fst-italic text-decoration-none"
                style={{ color: "#7b5844" }}
                onMouseEnter={(e) => {
                  e.target.style.fontWeight = "bold";
                }}
                onMouseLeave={(e) => {
                  e.target.style.fontWeight = "normal";
                }}
              >
                &#10132; Back home
              </NavLink>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <Profile
              user={user}
              newUserpic={user.userpic}
              setNewUserpic={setUserpic}
              newPassword={password}
              setNewPassword={setPassword}
              handleUpdateUser={handleUpdateUser}
              error={error}
            />

            <div className="mt-5">
              <h3 className="text-center" style={{ color: "#7b5844" }}>
                Create A New Member
              </h3>
              {error && <div className="alert alert-danger">{error}</div>}{" "}
              {/* Display error message */}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}{" "}
              {/* Display success message */}
              <form onSubmit={handleCreateMember} className="authForm">
                <div className="mb-4">
                  <label htmlFor="userpic" className="form-label">
                    Name user:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ color: "#42414d" }}
                    id="userpic"
                    value={userpic}
                    onChange={(e) => setUserpic(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="rolename" className="form-label">
                    Role:
                  </label>
                  {rolename === "New Role" ? (
                    <input
                      type="text"
                      className="form-control"
                      style={{ color: "#42414d" }}
                      placeholder="Enter new role name"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      required
                    />
                  ) : (
                    <select
                      className="form-select text-secondary"
                      id="rolename"
                      value={rolename}
                      onChange={(e) => {
                        setRolename(e.target.value);
                        if (e.target.value === "New Role") {
                          setNewRoleName("");
                        }
                      }}
                      required
                    >
                      {/*Select a existing role*/}
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.roleid} value={role.rolename}>
                          {role.rolename}
                        </option>
                      ))}
                      {/*Or create a new role*/}
                      <option value="New Role" style={{ color: "#7b5844" }}>
                        Create new role
                      </option>{" "}
                    </select>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    style={{ color: "#42414d" }}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#7b5844" }}
                >
                  Create As Member
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
