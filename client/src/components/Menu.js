import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className="menu container">
      <div className="row">
        <div className="col-12">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teamcrud"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
              >
                Team
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allprojects"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
              >
                All Projects
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
