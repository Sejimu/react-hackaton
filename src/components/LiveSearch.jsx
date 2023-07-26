import { Box, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

function LiveSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get("q") || "");
  const { setPage } = useProductContext();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      q: searchVal,
    });
    setPage(1);
  }, [searchVal]);

  return (
    <Box sx={{ display: "flex", ml: 2, alignItems: "center" }}>
      <SearchIcon />
      <InputBase
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={{
          width: "400px",
          marginRight: "100px",
          color: "#DAFFFB",
          backgroundColor: "#176B87",
          borderRadius: "30px",
          padding: "5px",
        }}
      />
    </Box>
  );
}

export default LiveSearch;
