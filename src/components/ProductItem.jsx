import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useProductContext } from "../contexts/ProductContext";
import { useCartContext } from "../contexts/CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useAuthContext } from "../contexts/AuthContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import { useFavouriteContext } from "../contexts/FavouriteContext";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

export default function ProductItem({ item }) {
  const { deleteProduct } = useProductContext();
  const { addProductToCart, isAlreadyInCart, deleteProductFromCart } =
    useCartContext();
  const [userEmailId, setUserEmailId] = useState(null);
  const { isAdmin, user } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAlreadyInFavorite, deleteFavorite, addFavorites, getFavorite } =
    useFavouriteContext();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getFavorite();
  }, []);

  React.useEffect(() => {
    if (typeof user !== "boolean") {
      const email = user.email;
      const parts = email.split("@");
      const username = parts[0] + item.id;
      setUserEmailId(username);
    }
    console.log("asdsa");
  }, [user]);

  function objHolder() {
    const obj = {
      item: item,
      email: user.email,
      itemId: item.id,
      id: userEmailId,
    };
    addFavorites(obj);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "270px",
        height: "380px",
        backgroundColor: "#176B87",
        color: "#dafffb",
      }}
    >
      {
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClick} aria-label="settings">
            {isAdmin() && <MoreVertIcon sx={{ color: "white" }} />}
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              component={Button}
              endIcon={<DeleteIcon />}
              sx={{ textTransform: "capitalize", color: "red" }}
              onClick={() => {
                const a = window.confirm("Are you sure?");
                if (a) {
                  deleteProduct(item.id);
                }
              }}
            >
              Delete
            </MenuItem>
            <MenuItem
              component={Button}
              endIcon={<EditIcon />}
              sx={{ textTransform: "capitalize", width: "100%" }}
              onClick={() => navigate(`/edit/${item.id}`)}
            >
              Edit
            </MenuItem>
          </Menu>
        </Box>
      }
      <CardMedia
        sx={{ height: 140 }}
        onClick={() => navigate(`/details/${item.id}`)}
        image={item.photo}
        title="green iguana"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.price}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.category}
        </Typography>
        <Typography variant="h6" color="text.dark">
          {item.description.slice(0, 25)}...
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-around",
        }}
      >
        {user ? (
          isAlreadyInCart(item.id) ? (
            <IconButton
              onClick={() => deleteProductFromCart(item.id)}
              aria-label="share"
            >
              <RemoveShoppingCartIcon color="error" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => addProductToCart(item)}
              aria-label="share"
            >
              <AddShoppingCartIcon sx={{ color: "#64CCC5" }} />
            </IconButton>
          )
        ) : (
          ""
        )}
        {user ? (
          isAlreadyInFavorite(item.id) ? (
            <Button sx={{ display: "flex", alignItems: "center" }}>
              <BookmarkRemoveIcon
                onClick={() => {
                  const a = window.confirm("Are you sure?");
                  if (a) {
                    deleteFavorite(userEmailId);
                  }
                }}
              />
            </Button>
          ) : (
            <Button
              onClick={objHolder}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <BookmarkIcon sx={{ color: "#64CCC5" }} />
            </Button>
          )
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
}
