import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import SubjectPage from "./pages/SubjectPage";
import StaffPage from "./pages/StaffPage";
import StudentMasterPage from "./pages/StudentMasterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="subjects" element={<SubjectPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="student-master" element={<StudentMasterPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
