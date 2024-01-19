// Navigation.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

/**
 * Component for rendering navigation bar with a side drawer.
 * @returns {JSX.Element} - Navigation bar JSX element.
 */
const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Learn Languages
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          <ListItem>
            <Link to="showwords">Home</Link>
          </ListItem>
          <ListItem>
            <Link to="word">Add vocabulary</Link>
          </ListItem>
          <ListItem>
            <Link to="play">Play</Link>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navigation;
