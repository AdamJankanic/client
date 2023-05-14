import { Box, Button, TextField } from "@mui/material";
import * as React from "react";

import axiosConfig from "../axiosConfig.js";

export function Verification() {
  const [verificationCode, setVerificationCode] = React.useState("");

  function handleVerification() {
    console.log(verificationCode);

    axiosConfig
      .post("/user/verify", {
        verificationCode: verificationCode,
      })
      .then((response) => {
        console.log("good ", response);
        if (response.status === 200) {
          alert("Verification successful");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log("bad ", error);
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Verification</h1>
      <TextField
        value={verificationCode}
        onChange={(e) => {
          setVerificationCode(e.target.value);
        }}
        type="number"
      ></TextField>
      <Button onClick={handleVerification}>Submit</Button>
    </Box>
  );
}
