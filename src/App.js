import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import SubjectPage from "./pages/SubjectPage";
import StaffPage from "./pages/StaffPage";
import StudentMasterPage from "./pages/StudentMasterPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="students" element={<StudentPage />} />
              <Route path="subjects" element={<SubjectPage />} />
              <Route path="staff" element={<StaffPage />} />
              <Route path="student-master" element={<StudentMasterPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
