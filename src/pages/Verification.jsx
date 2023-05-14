import { Box, Button, TextField } from "@mui/material";
import * as React from "react";

export function Verification() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Verification</h1>
      <TextField type="number"></TextField>
      <Button>Submit</Button>
    </Box>
  );
}
