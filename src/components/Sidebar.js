import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import SchoolIcon from "@mui/icons-material/School";

const Sidebar = () => {
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Students", icon: <PeopleIcon />, path: "/students" },
    { text: "Subjects", icon: <BookIcon />, path: "/subjects" },
    { text: "Staff", icon: <SchoolIcon />, path: "/staff" },
    { text: "Student Master", icon: <PeopleIcon />, path: "/student-master" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", mt: 8 },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem component={Link} to={item.path} key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
