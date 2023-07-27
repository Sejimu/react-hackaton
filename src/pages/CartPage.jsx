import React, { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function CartPage() {
  const { cart, getCart, increaseCount, decreaseCount, deleteProductFromCart } =
    useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  console.log(cart);

  if (cart.products.length < 1) {
    return (
      <Box
        sx={{
          maxWidth: "max-content",
          margin: "100px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Cart is Empty</Typography>
        <Button onClick={() => navigate(-1)}>Go to Menu</Button>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sub Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">
                <img src={item.image} width={30} alt="" />
              </TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.subPrice.toFixed(2)}</TableCell>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    if (item.count <= 1) {
                      deleteProductFromCart(item.id);
                    } else {
                      decreaseCount(item.id);
                    }
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography component={"span"} variant="h6">
                  {item.count}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={(e) => increaseCount(item.id)}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
        }}
      >
        <Typography variant="h4">
          Total Price: ${cart.totalPrice.toFixed(2)}
        </Typography>
        <Button component={Link} to="/success" variant="contained">
          Buy
        </Button>
      </Box>
    </TableContainer>
  );
}

export default CartPage;
