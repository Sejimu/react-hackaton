import React, { useEffect, useState } from "react";
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
import { DoDisturb } from "@mui/icons-material";

function CartPage() {
  const { cart, getCart, increaseCount, decreaseCount, deleteProductFromCart } =
    useCartContext();
  const [picture, setPicture] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

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
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: "90px",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
        }}
      >
        <Typography
          className="totalPrice"
          variant="h4"
          sx={{ color: "#272829" }}
        >
          Total Price: ${cart.totalPrice.toFixed(2)}
        </Typography>
        <Link to="/payment">
          <button
            className="cart_button"
            style={{
              backgroundColor: "#272829",
              border: "none",
              color: "white",
              fontWeight: "550",
              height: "35px",
              width: "90px",
              borderRadius: "6px",
            }}
            to="/payment"
          >
            BUY
          </button>
        </Link>
      </Box>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#D8D9DA ",
          display: "flex",
          justifyContent: "space-around",
          flexFlow: "wrap",
        }}
      >
        {cart.products.map((item) => (
          <div
            key={item.id} // Make sure to add a unique key for each item in the array
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              minWidth: "280px",
              height: "400px",
              border: "5px solid #272829",
              borderRadius: "15px",
              overflow: "hidden",
              backgroundColor: "#272829",
              display: "flex",
              flexFlow: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              onClick={() => navigate(`/details/${item.id}`)}
              onMouseEnter={() => setPicture(false)}
              onMouseLeave={() => setPicture(true)}
              style={{
                position: "relative",
                overflow: "hidden",
                height: "38%",
                backgroundImage: `url(${item.photo})`, // Use backticks for template literals
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                border: "2px solid white",
                borderRadius: "15px",
                cursor: "pointer",
              }}
            >
              {!picture && (
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    borderRadius: "10px",
                    left: 0,
                    top: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "white" /* Updated color to white */,
                    width: "100%",
                    height: "100%",
                    backdropFilter: "blur(10px)",
                    boxShadow:
                      "0px 4px 10px rgba(0, 0, 0, 0.25)" /* Added box shadow */,
                  }}
                >
                  <p>Your Text Here</p>
                </div>
              )}
            </div>

            <h2 style={{ color: "#FFF6E0" }}>{item.title}</h2>
            <div style={{ color: "#FFF6E0" }}>
              <p>{item.category}</p>
              <p>{item.price} $</p>
            </div>
            <div
              style={{
                width: "100%",
                height: "30%",
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#D8D9DA",
                    height: "30px",
                    borderRadius: "6px",
                  }}
                >
                  <IconButton
                    sx={{ color: "#272829" }}
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
                  <Typography
                    sx={{ color: "#272829" }}
                    component={"span"}
                    variant="h6"
                  >
                    {item.count}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={(e) => increaseCount(item.id)}
                  >
                    <AddIcon sx={{ color: "#272829" }} />
                  </IconButton>
                </div>
                <div style={{ display: "flex", flexFlow: "column" }}>
                  <p>{item.count} шт</p>
                  <p style={{ color: "#FFF6E0" }} align="right">
                    {item.subPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="cartButton"
                style={{
                  width: "270px",
                  height: "30px",
                  backgroundColor: "transparent",
                  borderRadius: "3px",
                  border: "2px solid #FFF6E0",
                  marginBottom: "30px",
                  color: "#FFF6E0",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  deleteProductFromCart(item.id);
                }}
              >
                Delete From Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CartPage;
