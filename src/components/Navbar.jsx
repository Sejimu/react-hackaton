import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const pages = [
  {
    title: "New Product",
    link: "/add",
  },
];

export default function Navbar() {
  const location = useLocation();

  return (
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <AppBar position="static"   sx={{
          backgroundColor: "#001C30",
        }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                display: { xs: "none", sm: "block" },
                textDecoration: "none",
                color: "inherit",
              }}
            >
              MUI
            </Typography>
            <Box sx={{ display: "flex", ml: 2 }}>
              {pages.map((page) => (
                <Button
                  component={NavLink}
                  to={page.link}
                  sx={{ my: 2, color: "#F0F0F0" }}
                  key={page.title}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", ml: 2, alignItems: "center" }}>
            <SearchIcon />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ width: "400px" }}
            />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="show more" color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
