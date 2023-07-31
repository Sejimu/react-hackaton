import React, { useEffect, useState } from "react";
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
import { Image } from "@mui/icons-material";

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
  const [userka, setUserka] = useState(false);

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

  useEffect(() => {
    if (user) {
      if (typeof user === "boolean") {
        setUserka(false);
      } else {
        setUserka({ displayName: user.displayName });
      }
    }
  }, [user]);

  return (
    <Box sx={{ display: { md: "flex" } }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "black",
          top: "0",
        }}
      >
        <Toolbar
          className="nav-item-middle"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            className="nav-item-left"
            sx={{ display: "flex", alignItems: "center", gap: "30px" }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, display: "none" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component={Box}
              onClick={(e) => {
                if (location.pathname === "/") {
                  return;
                }

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
            {userka &&
              pages.map((page, index) => {
                return (
                  <Typography
                    key={index}
                    component={Link}
                    to={page.link}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.title}
                  </Typography>
                );
              })}
          </Box>

          {location.pathname === "/" && (
            <LiveSearch className="nav-item-middle-search" />
          )}

          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            className="nav-item-right"
          >
            {userka ? (
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
                    src={
                      "https://yandex.ru/images/search?text=picture+user&img_url=https%3A%2F%2Fsun9-74.userapi.com%2Fimpf%2Fc830108%2Fv830108411%2F10cf1%2FTfWCNQvXD04.jpg%3Fsize%3D512x512%26quality%3D96%26sign%3Db17a70bc75e40ad08e90e5a3c0816c5e%26c_uniq_tag%3D_vx77grxmzxm7F5cI68HiAfL3ENBT1312YqVCWsy62o%26type%3Dalbum&pos=0&rpt=simage&stype=image&lr=10309&parent-reqid=1690780706119279-6151150964058339298-balancer-l7leveler-kubr-yp-vla-106-BAL-9810&source=serp"
                    }
                    alt={userka.displayName}
                  >
                    {userka.displayName && userka.displayName.split(" ")[0][0]}
                    {userka.displayName &&
                      userka.displayName.includes(" ") &&
                      userka.displayName.split(" ")[1][0]}
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
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>
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
            <IconButton
              className="nav-item-right"
              size="large"
              aria-label="show more"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
