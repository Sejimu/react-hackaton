import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import ProductItem from "./ProductItem";
import { Box, Typography } from "@mui/material";

function ProductsList() {
  const { getProducts, products } = useProductContext();
  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 50);
  }, []);

  return (
    <Box sx={{ backgroundColor: "# ", height: "100%" }}>
      <Typography
        variant="h3"
        sx={{ mb: "40px", pt: "10px", color: "black", fontWeight: "600" }}
      >
        All Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        {products.map((item) => (
          <ProductItem key={item.id} item={item} likes={item.likes} />
        ))}
      </Box>
    </Box>
  );
}

export default ProductsList;
