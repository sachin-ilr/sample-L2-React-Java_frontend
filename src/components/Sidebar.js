import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", background: "#f4f4f4", padding: "10px" }}>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/students" style={{ textDecoration: "none" }}>
              Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/subjects" style={{ textDecoration: "none" }}>
              Subjects
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff" style={{ textDecoration: "none" }}>
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink to="/student-master" style={{ textDecoration: "none" }}>
              Student Master
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
