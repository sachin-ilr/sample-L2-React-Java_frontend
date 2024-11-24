import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/students">Students</Link>
          </li>
          <li>
            <Link to="/subjects">Subjects</Link>
          </li>
          <li>
            <Link to="/staff">Staff</Link>
          </li>
          <li>
            <Link to="/student-master">Student Master</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Homepage;
