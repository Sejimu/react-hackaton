import React, { useEffect } from "react";
import ProductsList from "../components/ProductsList";
import { Box, Pagination } from "@mui/material";
import { LIMIT } from "../utils/consts";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import Footer from "../components/Footer";
import Filter from "../components/Filter";

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
    <div>
      <Box
        sx={{
          maxWidth: "max-content",
          margin: "30px auto",
          marginTop: "100px",
          background: "white",
        }}
      >
        <Filter />
      </Box>
      <ProductsList />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#176B87",
          color: "#dafffb",
          py: "15px",
        }}
      >
        <Pagination
          count={pageTotalCount}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
        />
      </Box>
      <Footer />
    </div>
  );
}

export default HomePage;
