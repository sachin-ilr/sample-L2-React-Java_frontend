import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <h2>Dashboard</h2>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subjects"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Subjects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student-master"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Student Master
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
