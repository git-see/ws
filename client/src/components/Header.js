import { useNavigate } from "react-router-dom";
import Logows from "./Logows";
import Logoprofile from "./Logoprofile";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Delete user information
    navigate("/auth");
  };

  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.echelon === "Admin") {
        navigate("/admin");
      } else if (user.echelon === "Member") {
        navigate("/member");
      }
    }
  };

  return (
    <div>
      <div>
        <div
          className="d-flex position-absolute w-100 logows"
          style={{ top: "0", right: "0" }}
        >
          <div className="py-5 px-3">
            <Logows width={80} height={80} />
          </div>

          <div className="ms-auto">
            <div
              className="mt-5 text-end px-5 mx-5"
              onClick={handleProfileClick}
            >
              <Logoprofile width={40} height={40} />
            </div>{" "}
            <button
              className="btn text-white my-3 mx-5"
              style={{ backgroundColor: "#7b5844" }}
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="header">
          <div className="bg-title">
            <h1>WORKSPACE</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
