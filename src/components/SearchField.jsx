import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export function SearchField() {
  return (
    <Box>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          width: "80%",
          // backgroundColor: "#989898",
          color: "black",
        }}
        placeholder="Search…"
        // inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
