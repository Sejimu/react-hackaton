import { Box, Button } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person3Icon from "@mui/icons-material/Person3";
import { Link } from "react-router-dom";

function FootNavbar() {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        maxHeight: "80px",
        height: "80px",
        bottom: "0px",
        width: "100%",
        display: "none",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      className="foot-navbar"
      position="sticky"
    >
      <Button sx={{ color: "white" }} component={Link} to="/">
        <HomeIcon fontSize="large" />
      </Button>
      <Button sx={{ color: "white" }} component={Link} to="/fav">
        <BookmarkIcon fontSize="large" />
      </Button>
      <Button sx={{ color: "white" }} component={Link} to="/add">
        <AddCircleIcon fontSize="large" />
      </Button>
      <Button sx={{ color: "white" }} component={Link} to="/cart">
        <ShoppingCartIcon fontSize="large" />
      </Button>
      <Button sx={{ color: "white" }} component={Link} to="/profile">
        <Person3Icon fontSize="large" />
      </Button>
    </Box>
  );
}

export default FootNavbar;
