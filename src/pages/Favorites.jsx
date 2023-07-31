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

export default function Favorites() {
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
    <TableContainer
      sx={{ width: "100vw", display: "flex", justifyContent: "center" }}
      component={Paper}
    >
      <Table
        sx={{
          marginTop: "90px",
          width: "80vw",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
