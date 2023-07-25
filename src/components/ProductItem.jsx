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

export default function ProductItem({ item }) {
  const { deleteProduct } = useProductContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#176B87", color: "#dafffb" }}>
      {
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
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
              onClick={() => deleteProduct(item.id)}
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
      <CardMedia sx={{ height: 140 }} image={item.photo} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.price}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.category}
        </Typography>
        <Typography variant="h6" color="text.dark">
          {item.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" sx={{ color: "#64CCC5" }}>
          Share
        </Button>
        <Button size="small" sx={{ color: "#64CCC5" }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
