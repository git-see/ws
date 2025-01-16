// Auth.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [userpic, setUserpic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        userpic,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      setError("Sorry, Authentication Failed!");
    }
  };

  return (
    <div className="container mt-5 auth">
      <div className="row">
        <div className="col-12">
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleLogin} className="authForm">
            <h2 className="mb-5">Connection</h2>
            <div className="mb-4">
              <label htmlFor="userpic" className="form-label">
                User Name
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
            <div className="mb-5">
              <label htmlFor="password" className="form-label">
                Password
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
              Connect
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
