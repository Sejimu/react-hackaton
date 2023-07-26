import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSearchParams } from "react-router-dom";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { LIMIT } from "../utils/consts";
import { useProductContext } from "../contexts/ProductContext";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WeekendIcon from "@mui/icons-material/Weekend";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function Filter() {
  const { setPage } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = React.useState(
    searchParams.get("category") || "all"
  );

  const handleChange = (_, value) => {
    value && setCategory(value);
  };

  React.useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    if (category === "all") {
      const { _page, q } = currentParams;
      setSearchParams({
        _limit: LIMIT,
        _page: _page || 1,
        q: q || "",
      });
    } else {
      setSearchParams({
        ...currentParams,
        category,
      });
      setPage(1);
    }
  }, [category]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={category}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all">
        <AllInclusiveIcon />
      </ToggleButton>
      <ToggleButton value="книги">
        <AutoStoriesIcon />
      </ToggleButton>
      <ToggleButton value="мода">
        <AutoAwesomeIcon />
      </ToggleButton>
      <ToggleButton value="мебель">
        <WeekendIcon />
      </ToggleButton>
      <ToggleButton value="техника">
        <LocalLaundryServiceIcon />
      </ToggleButton>
      <ToggleButton value="спорт">
        <SportsMartialArtsIcon />
      </ToggleButton>
      <ToggleButton value="электроника">
        <DevicesIcon />
      </ToggleButton>
      <ToggleButton value="недвижимость">
        <HomeIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
