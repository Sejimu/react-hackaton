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
import { useFavouriteContext } from "../contexts/FavouriteContext";
import { useAuthContext } from "../contexts/AuthContext";

function FavoritesPage() {
  const { getFavorite, deleteFavorite, favorit } = useFavouriteContext();
  const { user } = useAuthContext();
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFavorite();
  }, []);

  useEffect(() => {
    const filter = favorit.filter((item) => {
      return item.email === user.email;
    });
    setFiltered(filter);
  }, [favorit, user.email]);

  if (filtered.length < 1) {
    return (
      <Box
        sx={{
          maxWidth: "max-content",
          margin: "100px auto",
          marginTop: "90px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Favorites Is Empty</Typography>
        <Button onClick={() => navigate(-1)}>Go to Menu</Button>
      </Box>
    );
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#D8D9DA ",
          display: "flex",
          marginTop: "90px",
          justifyContent: "space-around",
          flexFlow: "wrap",
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
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
              onClick={() => navigate(`/details/${item.item.id}`)}
              style={{
                position: "relative",
                overflow: "hidden",
                height: "38%",
                backgroundImage: `url(${item.item.photo})`, // Use backticks for template literals
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                border: "2px solid white",
                borderRadius: "15px",
                cursor: "pointer",
              }}
            ></div>

            <h2 style={{ color: "#FFF6E0" }}>{item.item.title}</h2>
            <div style={{ color: "#FFF6E0" }}>
              <p>{item.item.category}</p>
              <p>{item.item.price} $</p>
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
                  deleteFavorite(item.id);
                }}
              >
                Delete From Favorit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoritesPage;
