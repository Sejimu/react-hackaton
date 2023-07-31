import React, { useEffect } from "react";
import ProductsList from "../components/ProductsList";
import { Box, Pagination } from "@mui/material";
import { LIMIT } from "../utils/consts";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import FootNavbar from "../components/FootNavbar";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, pageTotalCount, page, setPage } = useProductContext();

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      _page: page,
      _limit: LIMIT,
    });
  }, [page]);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          maxWidth: "max-content",
          margin: "30px auto",
          marginTop: "90px",
          background: "black",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Filter />
      </Box>
      <ProductsList />
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Pagination
          count={pageTotalCount}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="standard"
        />
      </Box>
      <Footer />
    </div>
  );
}

export default HomePage;
