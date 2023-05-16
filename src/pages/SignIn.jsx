import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../reducers/User.js";

import axiosConfig from "../axiosConfig.js";

// const theme = createTheme();

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(document.cookie);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    console.log("Login attempt");
    axiosConfig
      .post(
        "/user/login",
        {
          email: data.get("email"),
          password: data.get("password"),
        },
        {
          withCredentials: true, // send cookies with the request
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )

      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          console.log("Login successful");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch(addUserData(response.data));

          localStorage.setItem(
            "token",
            JSON.stringify(response.data.token.token)
          );
          localStorage.setItem(
            "tokenExpiration",
            JSON.stringify(response.data.token.expiration)
          );

          localStorage.setItem(
            "refreshExpiration",
            JSON.stringify(response.data.token.refreshExpiration)
          );

          if (response.data.user.verified) navigate("/");
          else navigate("/verify");
        }
      });
  };

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
