import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: 30 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
