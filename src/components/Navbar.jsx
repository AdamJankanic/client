import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import * as React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axioConfig from "../axiosConfig.js";

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
      const user = JSON.parse(localStorage.getItem("user"));
      axioConfig.get(`/user/logout/${user.uuid}`).then((response) => {
        console.log(response);
        localStorage.clear();
        navigate("/signin");
      });
    } else if (event.target.innerText === "My account") {
      navigate("/profile");
    } else if (event.target.innerText === "CHAT") {
      navigate("/");
      // joinChats(user.uuid);
    } else if (event.target.innerText === "MARKETPLACE") {
      navigate("/market");
    } else if (event.target.innerText === "EVENTS") {
      navigate("/events");
    }
  };

  const isMobile = useMediaQuery("(max-width: 520px)");

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
            display: isMobile ? "none" : "flex",

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
            CHAT
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
            MARKETPLACE
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
            EVENTS
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
            <MenuItem
              sx={{
                display: isMobile ? "flex" : "none",
              }}
              onClick={handleCloseProfileMenu}
            >
              <Typography onClick={handlePageChange}>CHAT</Typography>
            </MenuItem>
            <MenuItem
              sx={{
                display: isMobile ? "flex" : "none",
              }}
              onClick={handleCloseProfileMenu}
            >
              <Typography onClick={handlePageChange}>MARKETPLACE</Typography>
            </MenuItem>
            <MenuItem
              sx={{
                display: isMobile ? "flex" : "none",
              }}
              onClick={handleCloseProfileMenu}
            >
              <Typography onClick={handlePageChange}>EVENTS</Typography>
            </MenuItem>
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
