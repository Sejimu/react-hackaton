import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuthContext } from "../contexts/AuthContext";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";
import LiveSearch from "./LiveSearch";
import { useCartContext } from "../contexts/CartContext";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

const pages = [
  {
    title: "New Product",
    link: "/add",
  },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuthContext();
  const { setPage } = useProductContext();
  const { cart, getCart } = useCartContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getCart();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { md: "flex" } }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "black",
          top: "0",
        }}
      >
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
              component={Box}
              onClick={() => {
                setPage(1);
                navigate("/");
              }}
              sx={{
                display: { xs: "none", sm: "block" },
                textDecoration: "none",
                color: "inherit",
              }}
            >
              OFOFO
            </Typography>
          </Box>

          {location.pathname === "/" && <LiveSearch />}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  component={Link}
                  to="/fav"
                >
                  <Badge badgeContent={cart.products.length} color="error">
                    <BookmarksIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  component={Link}
                  to="/cart"
                >
                  <Badge badgeContent={cart.products.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              ""
            )}

            {!user ? (
              <Button component={Link} to="/auth" sx={{ color: "#F0F0F0" }}>
                Login
              </Button>
            ) : (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  color="inherit"
                >
                  <Avatar
                    sx={{ textTransform: "uppercase" }}
                    src={user.photoURL}
                    alt={user.displayName}
                  >
                    {user.displayName && user.displayName.split(" ")[0][0]}
                    {user.displayName &&
                      user.displayName.includes(" ") &&
                      user.displayName.split(" ")[1][0]}
                  </Avatar>
                </IconButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
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
