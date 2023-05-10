import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import * as React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { joinChats } from "../websocket.js";

export function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

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
      // joinChats(user.uuid);
    } else if (event.target.innerText === "Marketplace") {
      navigate("/market");
    } else if (event.target.innerText === "Events") {
      navigate("/events");
    }
  };

  return (
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
          {/* <h3>SchoolChat</h3> */}
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
            Marketplace
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
            Events
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
  );
}
