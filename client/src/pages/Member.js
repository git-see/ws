import React, { useState } from "react";
import Profile from "../components/Profile";
import { NavLink } from "react-router-dom";

const Member = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [password, setPassword] = useState(user.password);
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Logic to change password...
    // Ensure to validate and handle errors appropriately
    if (!password) {
      setError("Password cannot be empty.");
      return;
    }
    // Assume there's an API endpoint to change the password
    try {
      const response = await fetch(
        `http://localhost:8000/api/update-password/${user.userid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: password }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update password.");
      }
      setError("");
      alert("Password updated successfully!");
    } catch (error) {
      setError(error.message);
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
            <h1>MEMBER Space</h1>
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
              setNewUserpic={() => {}}
              newPassword={password}
              setNewPassword={setPassword}
              handleUpdateUser={handlePasswordChange}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
