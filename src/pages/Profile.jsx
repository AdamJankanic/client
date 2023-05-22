import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Grid,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../axiosConfig.js";
import { myEvents, clearStore, joinEvent } from "../reducers/Events";
import { myOffers, clearOffers, contactOffers } from "../reducers/Offers";

import { EventProfile } from "../components/EventProfile";
import { EventJoined } from "../components/EventJoined";
import { OfferProfile } from "../components/OfferProfile";
import { OfferContacted } from "../components/OfferContacted";
import { ChangeName } from "../components/ChangeName.jsx";

import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
const activeDesign = {
  width: "90%",
  color: "white",
  fontSize: "1.2rem",
  backgroundColor: "rgb(0, 107, 141)",
  fontWeight: "bold",
  // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",

  marginTop: "1rem",
  marginBottom: "1rem",
  alignSelf: "center",
  borderRadius: "15px",
  padding: "5px",
  backgroundImage:
    "radial-gradient(circle at 10% 20%, rgb(26, 178, 203) 0%, rgb(0, 102, 161) 90.1%)",
  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",

  // boxShadow:
  //   "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  ":hover": {
    backgroundColor: "#DDD",
    boxShadow: "none",
  },
};
const buttonDesign = {
  width: "90%",
  color: "white",
  fontSize: "1.2rem",
  backgroundColor: "white",
  color: " rgb(0, 102, 161)",
  fontWeight: "bold",
  // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
  padding: "0.1rem 1rem",
  marginTop: "1rem",
  marginBottom: "1rem",
  alignSelf: "center",

  border: "5px solid  rgb(0, 102, 161)",

  borderRadius: "15px",
  // backgroundImage:
  //   "radial-gradient(circle at 10% 20%, rgb(26, 178, 203) 0%, rgb(0, 102, 161) 90.1%)",
  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  ":hover": {
    backgroundColor: "#DDD",
    boxShadow: "none",
  },
};

const profileText = {
  fontWeight: "bold",
  fontSize: "1.5rem",
  textDecoration: "underline",
};

const profileValue = {
  fontSize: "1.2rem",
  fontWeight: "normal",
  fontWeight: "bold",
};

export function Profile() {
  const [activeButton, setActiveButton] = React.useState("myProfile");
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [modal, setModal] = React.useState(false);
  const handleClose = () => {
    console.log("handleCloseeeeeeeeeeeeeeeeee");
    setModal(false);
    return false;
  };

  if (!user) {
    window.location.href = "/signin";
  }

  async function getJoinedEvents() {
    axiosConfig
      .get(`/event/joined/${user.uuid}`)
      .then((res) => {
        console.log("joined events");
        console.log(res.data);
        res.data.forEach((event) => {
          dispatch(joinEvent(event));
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 434) navigate("/verify");
      });
  }

  //get contacted offers
  async function getContactedOffers() {
    axiosConfig
      .get(`/offer/contacted/${user.uuid}`)
      .then((res) => {
        console.log("contacted offers");
        console.log(res.data);
        res.data.forEach((offer) => {
          dispatch(contactOffers(offer));
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 434) navigate("/verify");
      });
  }

  async function getMyEvents() {
    axiosConfig
      .get(`/event/myevents/${user.uuid}`)
      .then((res) => {
        res.data.forEach((event) => {
          dispatch(myEvents(event));
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 434) navigate("/verify");
      });
  }
  async function getMyOffers() {
    axiosConfig
      .get(`/offer/myoffers/${user.uuid}`)
      .then((res) => {
        res.data.forEach((offer) => {
          dispatch(myOffers(offer));
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 434) navigate("/verify");
      });
  }

  React.useEffect(() => {
    dispatch(clearStore());
    dispatch(clearOffers());
    getMyEvents();
    getMyOffers();
    getJoinedEvents();
    getContactedOffers();
  }, []);

  const events = selector.eventsStore.myEvents;
  const joinedEvents = selector.eventsStore.joinedEvents;
  const offers = selector.offersStore.myOffers;
  const contactedOffers = selector.offersStore.contactedOffers;

  function handleNameChange() {
    if (modal) return;
    console.log("change name");
    setModal(true);
  }

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1040px)");
  const isMobile = useMediaQuery("(max-width: 520px)");
  const textBreak = useMediaQuery("(max-width: 420px)");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuIcon
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          display: isDesktop ? "none" : "block",
          color: "white",
          zIndex: 10000,
        }}
        onClick={() => setDrawerOpen(!drawerOpen)}
      />
      <Navbar />
      {/* ---------------------------------------------------------------------------- */}
      {/* left drawer */}
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        sx={{
          width: isDesktop ? "20%" : isMobile ? "75%" : "40%",
          flexShrink: 0,
          // boxSizing: "border-box",
          [`& .MuiDrawer-paper`]: {
            width: isDesktop ? "20%" : isMobile ? "75%" : "40%",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={drawerOpen}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            height: "100%",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: "0.2rem",
          }}
        >
          {/* <TextField
            variant="standard"
            // value={searchText}
            // onChange={handleSearchChange}
            InputProps={{}}
            size="normal"
            sx={{
              width: "95%",
              height: "1rem",
              marginBottom: "1rem",
            }}
          ></TextField> */}

          <Button
            variant="contained"
            sx={activeButton === "myProfile" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("myProfile");
              setDrawerOpen(false);
            }}
          >
            My profile
          </Button>

          <Button
            variant="contained"
            sx={activeButton === "myOffers" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("myOffers");
              setDrawerOpen(false);
            }}
          >
            My offers
          </Button>

          <Button
            variant="contained"
            sx={activeButton === "myEvents" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("myEvents");
              setDrawerOpen(false);
            }}
          >
            My events
          </Button>
          <Button
            variant="contained"
            sx={activeButton === "joinedEvents" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("joinedEvents");
              setDrawerOpen(false);
            }}
          >
            Joined events
          </Button>
          <Button
            variant="contained"
            sx={activeButton === "reactedOffers" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("reactedOffers");
              setDrawerOpen(false);
            }}
          >
            Reacted offers
          </Button>
        </Box>
      </Drawer>

      <Box
        sx={{
          margin: 0,
          padding: 0,
          flexGrow: 1,
          height: "100vh",
          maxHeight: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            display: activeButton === "myProfile" ? "flex" : "none",
            flexDirection: "column",
            alignSelf: "center",
            alignItems: "center",
            width: isDesktop ? "80%" : isMobile ? "100%" : "80%",
            border: "1px solid rgba(0, 107, 141, 1)",
            borderRadius: "15px",
            borderWidth: "5px",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: textBreak ? "center" : "flex-start",
              gap: "2rem",
            }}
          >
            <h1
              style={{
                margin: 0,
              }}
            >
              My Profile
            </h1>

            <Box
              sx={{
                display: "flex",
                flexDirection: textBreak ? "column" : "row",
                alignItems: "center",
                gap: "1rem",
                backgroundColor: "rgba(0, 107, 141, 0.2)",
                padding: "0.5rem",
                borderRadius: "15px",
              }}
            >
              <Typography sx={profileText}>Username:</Typography>
              <Typography sx={profileValue}>{user.username}</Typography>
              {/* <EditIcon onClick={handleNameChange}></EditIcon> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: textBreak ? "column" : "row",
                gap: "1rem",
                backgroundColor: "rgba(0, 107, 141, 0.2)",
                padding: "0.5rem",
                borderRadius: "15px",
              }}
            >
              <Typography sx={profileText}>Email:</Typography>
              <Typography sx={profileValue}>{user.email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: user.verified ? "green" : "red",
                  padding: "0.5rem",
                  borderRadius: "15px",
                  color: "white",
                }}
              >
                {user.verified ? "Verified" : "Non verified"}
              </Typography>
            </Box>
          </Box>

          {/* <Button
            variant="contained"
            sx={{
              width: "50%",
              marginTop: "1rem",
              color: "white",
              fontSize: "1.2rem",
              // backgroundColor: "white",
              backgroundColor: "rgb(0, 107, 141)",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              padding: "0.1rem 1rem",
              // alignSelf: "center",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              ":hover": {
                backgroundColor: "#DDD",
                boxShadow: "none",
              },
            }}
          >
            Edit profile
          </Button> */}
        </Box>
        <Box
          sx={{
            display: activeButton === "myOffers" ? "flex" : "none",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid container spacing={4}>
            {offers.map((offer, index) => (
              <Grid key={index} item lg={4} sm={6} xs={12}>
                <OfferProfile key={index} offer={offer} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: activeButton === "myEvents" ? "flex" : "none",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid container spacing={4}>
            {events.map((event, index) => (
              <Grid key={index} item lg={4} sm={6} xs={12}>
                <EventProfile key={index} event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: activeButton === "joinedEvents" ? "flex" : "none",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid container spacing={4}>
            {joinedEvents.map((event, index) => (
              <Grid key={index} item lg={4} sm={6} xs={12}>
                <EventJoined key={index} event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            display: activeButton === "reactedOffers" ? "flex" : "none",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid container spacing={4}>
            {contactedOffers.map((offer, index) => (
              <Grid key={index} item lg={4} sm={6} xs={12}>
                <OfferContacted key={index} offer={offer} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <ChangeName open={modal} onClose={handleClose} />
    </Box>
  );
}
