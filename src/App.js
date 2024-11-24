import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import SubjectPage from "./pages/SubjectPage";
import StaffPage from "./pages/StaffPage";
import StudentMasterPage from "./pages/StudentMasterPage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/subjects" element={<SubjectPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/student-master" element={<StudentMasterPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
