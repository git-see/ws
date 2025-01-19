import React, { useState } from "react";
import Profile from "../components/Profile";
import { NavLink } from "react-router-dom";
import axios from "axios"; // import axios

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [newUserpic, setNewUserpic] = useState(user.userpic);
  const [newPassword, setNewPassword] = useState(user.password);
  const [error, setError] = useState("");

  const handleCreateMember = async (e) => {
    e.preventDefault();
    try {
      // Logic to create a new member here : Only admin can do this
      // Exemple :
      // const response = await axios.post("http://localhost:8000/api/create-member", {
      //   userpic: newUserpic,
      //   password: newPassword,
      //   echelon: "Member" (automatically)
      // });
      // then the user receives an SMS or an email to enter his password. He can then modify his password himself.

      // Reset fields after success
      setNewUserpic("");
      setNewPassword("");
    } catch (error) {
      setError("Error creating member !");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      // Logic to update user
      // Example :
      // const response = await axios.put("http://localhost:8000/api/update-user", {
      //  ...
      //  ...
      // });
    } catch (error) {
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
              newUserpic={newUserpic}
              setNewUserpic={setNewUserpic}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              handleUpdateUser={handleUpdateUser}
              error={error}
            />

            <div className="mt-5">
              <h3 className="text-center" style={{ color: "#7b5844" }}>
                Create a new member
              </h3>
              <form onSubmit={handleCreateMember} className="authForm">
                <div className="mb-4">
                  <label htmlFor="newUserpic" className="form-label">
                    Name user:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ color: "#42414d" }}
                    id="newUserpic"
                    value={newUserpic}
                    onChange={(e) => setNewUserpic(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="newPassword" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    style={{ color: "#42414d" }}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
