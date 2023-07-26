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
  // useEffect(() => {
  //   window.location.reload();
  // }, [products]);

  return (
    <Box sx={{ backgroundColor: "#001C30" }}>
      <Typography variant="h3" sx={{ mb: "40px", pt: "90px" }}>
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
          <ProductItem key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}

export default ProductsList;
