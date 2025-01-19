import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({
  user,
  newUserpic,
  setNewUserpic,
  newPassword,
  setNewPassword,
  handleUpdateUser,
  error,
}) => {
  const [roleName, setRoleName] = useState("");

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

  return (
    <div className="mt-5">
      <h3 className="text-center" style={{ color: "#7b5844" }}>
        Update my password
      </h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleUpdateUser} className="authForm mb-5">
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
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            style={{ color: "#42414d" }}
            id="userPassword"
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
          To update
        </button>
      </form>
    </div>
  );
};

export default Profile;
