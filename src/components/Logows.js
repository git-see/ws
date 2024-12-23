import { NavLink } from "react-router-dom";

import logows from "../images/logows.png";

export default function Logows({ width = 80, height = 80 }) {
  return (
    <div className="logows">
                    <NavLink to="/">
      <div>
        <img
          src={logows}
          alt="Logo Workspace"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
      </NavLink>
    </div>
  );
}
