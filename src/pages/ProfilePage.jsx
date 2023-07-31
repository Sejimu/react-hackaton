import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

function ProfilePage() {
  const { user } = useAuthContext();
  const { deleteProduct, prodact, getProdact } = useProductContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtred, setFiltred] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setTimeout(() => {
      getProdact();
    }, 50);
  }, []);

  useEffect(() => {
    const filter = prodact.filter((item) => {
      return item.user === user.email;
    });
    setFiltred(filter);
  }, [prodact, user.email]);

  return (
    <div style={{ margin: "90px auto" }}>
      <div style={{ color: "black" }}>
        <img src={user.photoURL} alt="user" />
        <p>{user.email}</p>
        <p>{user.displayName}</p>
        <p>{user.phone}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          justifyContent: "center",
        }}
      >
        {filtred.length > 0 ? (
          filtred.map((item) => (
            <Card
              key={item.id}
              sx={{
                maxWidth: 345,
                width: "270px",
                height: "380px",
                backgroundColor: "#272829",
                color: "#dafffb",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              {
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={handleClick} aria-label="settings">
                    <MoreVertIcon sx={{ color: "#FFF6E0" }} />
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "#FFF6E0" }}
                >
                  {item.price}$
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "#FFF6E0" }}
                >
                  {item.category}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.dark"
                  sx={{ color: "#FFF6E0" }}
                >
                  {item.description.slice(0, 25)}...
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>There is no your products</p>
            <Button>Add New Product</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
