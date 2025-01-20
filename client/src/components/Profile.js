import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ user, newUserpic, setNewUserpic, error }) => {
  const [roleName, setRoleName] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchRoleName = async () => {
      // GET request to the API to retrieve the role name based on the user's role ID.
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-role/${user.user_roleid}`
        );
        setRoleName(response.data.rolename);
      } catch (error) {
        console.error("Error fetching role name:", error);
      }
    };

    if (user.user_roleid) {
      fetchRoleName();
    }
  }, [user.user_roleid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localPassword || !newPassword) {
      alert("Please enter both current and new password.");
      return;
    }

    try {
      // Call the new endpoint to update the password
      const response = await axios.put(
        `http://localhost:8000/api/update-password/${user.userid}`,
        {
          currentPassword: localPassword, // Send current password for verification
          newPassword: newPassword, // Send new password to update
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully!");
        // Reset the password fields
        setLocalPassword("");
        setNewPassword("");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      alert(
        "Error updating password: " +
          (err.response && err.response.data.message
            ? err.response.data.message
            : "Please try again.")
      );
    }
  };

  return (
    <div className="mt-5">
      <h3 className="text-center" style={{ color: "#7b5844" }}>
        Update My Password
      </h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="authForm mb-5">
        <div className="mb-4">
          <label htmlFor="userpic" className="form-label">
            Name User:
          </label>
          <input
            type="text"
            className="form-control"
            style={{ color: "#7b5844" }}
            id="userpic"
            value={newUserpic}
            onChange={(e) => setNewUserpic(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rolename" className="form-label">
            Role:
          </label>
          <input
            className="form-control"
            style={{ color: "#7b5844" }}
            value={roleName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userPassword" className="form-label">
            Current Password:
          </label>
          <input
            type="password"
            className="form-control"
            style={{ color: "#42414d" }}
            id="userPassword"
            value={localPassword}
            onChange={(e) => setLocalPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="form-label">
            New Password:
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
          To Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
