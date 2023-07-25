import React, { useEffect } from "react";
import ProductsList from "../components/ProductsList";
import { Box, Pagination } from "@mui/material";
import { LIMIT } from "../utils/consts";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

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
      <ProductsList />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#001C30",
          color: "#dafffb",
        }}
      >
        <Pagination
          count={pageTotalCount}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
        />
      </Box>
    </div>
  );
}

export default HomePage;
