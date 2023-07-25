import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";

const defaultTheme = createTheme();

export default function AddProducts() {
  const { addProduct } = useProductContext();
  const [formValue, setFormValue] = useState({
    title: "",
    composition: "",
    price: "",
    photo: "",
    category: "",
  });

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
      !formValue.price.trim() ||
      !formValue.photo.trim() ||
      !formValue.composition.trim() ||
      !formValue.category.trim()
    ) {
      return;
    }

    addProduct({ ...formValue, price: +formValue.price });

    setFormValue({
      title: "",
      composition: "",
      price: "",
      photo: "",
      category: "",
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Новый продукт
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="composition"
              label="Описание"
              value={formValue.composition}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              value={formValue.price}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="photo"
              label="Url"
              value={formValue.photo}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={formValue.category}
                onChange={handleChange}
                label="Категория"
                name="category"
              >
                <MenuItem value={"Книги"}>Книги</MenuItem>
                <MenuItem value={"Мода"}>Мода</MenuItem>
                <MenuItem value={"Красота"}>Красота</MenuItem>
                <MenuItem value={"Мебель"}>Мебель</MenuItem>
                <MenuItem value={"Техника"}>Техника</MenuItem>
                <MenuItem value={"Спорт"}>Спорт</MenuItem>
                <MenuItem value={"Электроника"}>Электроника</MenuItem>
                <MenuItem value={"Недвижимость"}>Недвижимость</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Добавить новый продукт
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
