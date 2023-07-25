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
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function AddProducts() {
  const navigate = useNavigate();
  const { addProduct } = useProductContext();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
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
      !formValue.description.trim() ||
      !formValue.category.trim()
    ) {
      return;
    }

    addProduct({ ...formValue, price: +formValue.price, selected: false });

    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ color: "#DAFFFB", backgroundColor: "#001C30", height: "100vh" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: "40px",
            color: "#DAFFFB",
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
              sx={{ backgroundColor: "#64CCC5" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Описание"
              value={formValue.description}
              onChange={handleChange}
              sx={{ backgroundColor: "#64CCC5" }}
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
              sx={{ backgroundColor: "#64CCC5" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="photo"
              label="Url"
              value={formValue.photo}
              onChange={handleChange}
              sx={{ backgroundColor: "#64CCC5", mb: "25px" }}
            />

            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={formValue.category}
                onChange={handleChange}
                label="Категория"
                name="category"
                sx={{
                  backgroundColor: "#64CCC5",
                }}
              >
                <MenuItem value={"книги"}>Книги</MenuItem>
                <MenuItem value={"мода"}>Мода</MenuItem>
                <MenuItem value={"красота"}>Красота</MenuItem>
                <MenuItem value={"мебель"}>Мебель</MenuItem>
                <MenuItem value={"техника"}>Техника</MenuItem>
                <MenuItem value={"спорт"}>Спорт</MenuItem>
                <MenuItem value={"электроника"}>Электроника</MenuItem>
                <MenuItem value={"недвижимость"}>Недвижимость</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#DAFFFB",
                color: "#001C30",
              }}
            >
              Добавить новый продукт
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
