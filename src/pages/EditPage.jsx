import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

const defaultTheme = createTheme();

export default function EditPage() {
  const navigate = useNavigate();
  const { updateProduct, getOneProduct, product } = useProductContext();
  const { id } = useParams();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    price: "",
    photo: "",
    category: "",
  });

  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (product) {
      setFormValue(product);
    }
  }, [product]);

  function handleChange(e) {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.photo.trim() ||
      !formValue.description.trim() ||
      !formValue.category.trim()
    ) {
      return;
    }

    updateProduct(id, { ...formValue, price: +formValue.price, likes: [] });

    navigate(-1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          color: "black",
          backgroundColor: "#D8D9DA",
          height: "100vh",
          marginBottom: "90px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: "40px",
            color: "black",
          }}
        >
          <Typography component="h1" variant="h5">
            Новый продукт
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ color: "#DAFFFB", mt: 1 }}
          >
            <input
              placeholder="Title"
              required
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
              style={{
                minWidth: "250px",
                width: "40vw",
                height: "35px",
                border: "none",
                color: "white",
                backgroundColor: "#272829",
                marginBottom: "5px",
                paddingLeft: "5px",
                border: "none",
                borderRadius: "5px",
              }}
            />

            <input
              placeholder="description"
              required
              name="description"
              value={formValue.description}
              onChange={handleChange}
              style={{
                minWidth: "250px",
                width: "40vw",
                height: "35px",
                border: "none",
                color: "white",
                backgroundColor: "#272829",
                marginBottom: "5px",
                paddingLeft: "5px",
                border: "none",
                borderRadius: "5px",
              }}
            />
            <input
              placeholder="Price"
              required
              name="price"
              value={formValue.price}
              onChange={handleChange}
              style={{
                minWidth: "250px",
                width: "40vw",
                height: "35px",
                border: "none",
                color: "white",
                backgroundColor: "#272829",
                marginBottom: "5px",
                paddingLeft: "5px",
                border: "none",
                borderRadius: "5px",
              }}
            />
            <input
              placeholder="Photo"
              required
              name="photo"
              value={formValue.photo}
              onChange={handleChange}
              style={{
                minWidth: "250px",
                width: "40vw",
                height: "35px",
                border: "none",
                color: "white",
                backgroundColor: "#272829",
                marginBottom: "5px",
                paddingLeft: "5px",
                border: "none",
                borderRadius: "5px",
              }}
            />

            <select
              id="category"
              name="category"
              value={formValue.category}
              onChange={handleChange}
              style={{
                color: "white",
                backgroundColor: "#272829",
                minWidth: "250px",
                width: "40vw",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                height: "35px",
                border: "none",
                color: "white",
                backgroundColor: "#272829",
              }}
            >
              <option value="книги">Книги</option>
              <option value="мода">Мода</option>
              <option value="красота">Красота</option>
              <option value="мебель">Мебель</option>
              <option value="техника">Техника</option>
              <option value="спорт">Спорт</option>
              <option value="электроника">Электроника</option>
              <option value="недвижимость">Недвижимость</option>
            </select>
            <button
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#272829",
                minWidth: "250px",
                width: "40vw",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                height: "35px",
                border: "none",
                color: "white",
                marginTop: "5px",
                backgroundColor: "#61677A",
              }}
            >
              Change
            </button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
