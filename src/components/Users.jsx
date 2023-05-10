import React from "react";
import { Typography, Box, Avatar } from "@mui/material";

import sourceAdress from "../obrazok.png";

export function Users() {
  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        // justifyContent: "space-between",
        gap: "0.5rem",
        marginBottom: "0.5rem",
        padding: "0.5rem",
        border: "1px solid black",
        borderRadius: "10px",
        gridTemplateColumns: "20fr 5fr 35fr 15fr 15fr",
      }}
    >
      {/* <Typography
        sx={{
          fontSize: "1.75rem",
          // fontWeight: "bold",
          color: "red",
          backgroundColor: "black",
          width: "2.25rem",
          height: "2.25rem",
          lineHeight: "2.25rem",
          textAlign: "center",
          borderRadius: "50%",
        }}
      >
        R
      </Typography> */}
      <Avatar
        alt="cernoch za stromom"
        src={sourceAdress}
        sx={{
          height: 40,
          width: 40,
        }}
      />
      <Typography
        sx={{
          // color: "red",
          backgroundColor: "green",
          width: "0.7rem",
          height: "0.7rem",
          borderRadius: "50%",
          position: "relative",
          right: "1.2rem",
          top: "1rem",
        }}
      ></Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        John
      </Typography>

      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        STU
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        FIIT
      </Typography>
    </Box>
  );
}
