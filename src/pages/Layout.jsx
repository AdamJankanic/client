import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";

import * as React from "react";

export function Layout() {
  const navigate = useNavigate();
  // profile menu options
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = (event) => {
    console.log(event.target.innerText);

    setAnchorEl(null);
  };

  // changing pages
  const handlePageChange = (event) => {
    if (event.target.innerText === "Log out") {
      navigate("/signup");
    } else if (event.target.innerText === "My account") {
      navigate("/profile");
    } else if (event.target.innerText === "Chat") {
      navigate("/");
    } else if (event.target.innerText === "Navigation") {
      navigate("/navigation");
    }
  };

  return (
    <Box
      sx={{ display: "flex" }}
      // onClick={() => (modal ? setModal(!modal) : null)}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // backgroundColor: "#303841",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgb(0, 69, 91) 0%,  rgb(0, 107, 141) 90%)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* left side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "18%",
              justifyContent: "space-between",
            }}
          >
            <h3>SchoolChat</h3>
          </Box>

          {/* middle */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <Typography
              sx={{
                // my: 2,
                color: "white",
                // display: "block",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={handlePageChange}
            >
              Chat
            </Typography>
            <Typography
              sx={{
                // my: 2,
                color: "white",
                // display: "block",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={handlePageChange}
            >
              Navigation
            </Typography>
          </Box>
          {/* right side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "flex-end",
              width: "18%",
            }}
          >
            <Typography
              sx={{
                // backgroundColor: "rgba(144,238,144,0.2)",
                backgroundColor: "rgba(255, 255, 255  , 1)",
                padding: "0.2rem",
                // color: "#05b714",
                color: "rgb(80, 207, 0  )",
                // color: "#28B62C",
                borderRadius: "10px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Online
            </Typography>
            <IconButton onClick={handleMenu}>
              {/* <Avatar></Avatar> */}
              <AccountCircleIcon
                sx={{
                  color: "white",
                  fontSize: "2.5rem",
                }}
              ></AccountCircleIcon>
            </IconButton>
            {/* ----------------------------------------------------------------------------------- */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={handleCloseProfileMenu}>
                <Typography onClick={handlePageChange}>My account</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseProfileMenu}>
                <Typography onClick={handlePageChange}>Log out</Typography>
              </MenuItem>
            </Menu>

            {/* ---------------------------------------------------------------------------------- */}
          </Box>
        </Toolbar>
      </AppBar>
      {/* left drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: "20%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "20%",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      ></Drawer>
    </Box>
  );
}
