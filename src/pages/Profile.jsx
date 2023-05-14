import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Grid,
  TextField,
  Toolbar,
} from "@mui/material";
import { Navbar } from "../components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../axiosConfig.js";
import { myEvents, clearStore } from "../reducers/Events";
import { myOffers, clearOffers } from "../reducers/Offers";

import { EventProfile } from "../components/EventProfile";
import { OfferProfile } from "../components/OfferProfile";

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

export function Profile() {
  const [activeButton, setActiveButton] = React.useState("myProfile");
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "/signin";
  }

  async function getMyEvents() {
    axiosConfig.get(`/event/myevents/${user.uuid}`).then((res) => {
      dispatch(clearStore());
      // console.log("my events");
      // console.log(res.data);
      res.data.forEach((event) => {
        dispatch(myEvents(event));
      });
    });
  }
  async function getMyOffers() {
    axiosConfig.get(`/offer/myoffers/${user.uuid}`).then((res) => {
      dispatch(clearOffers());
      // console.log("my events");
      // console.log(res.data);
      res.data.forEach((offer) => {
        dispatch(myOffers(offer));
      });
    });
  }

  React.useEffect(() => {
    getMyEvents();
    getMyOffers();
  }, []);

  const events = selector.eventsStore.myEvents;
  const offers = selector.offersStore.myOffers;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Navbar />
      {/* ---------------------------------------------------------------------------- */}
      {/* left drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: "20%",
          flexShrink: 0,
          // boxSizing: "border-box",
          [`& .MuiDrawer-paper`]: {
            width: "20%",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
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
          <TextField
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
          ></TextField>

          <Button
            variant="contained"
            sx={activeButton === "myProfile" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("myProfile");
            }}
          >
            My profile
          </Button>

          <Button
            variant="contained"
            sx={activeButton === "myOffers" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("myOffers");
            }}
          >
            My offers
          </Button>

          <Button
            variant="contained"
            sx={activeButton === "myEvents" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("myEvents");
            }}
          >
            My events
          </Button>
          <Button
            variant="contained"
            sx={activeButton === "joinedEvents" ? activeDesign : buttonDesign}
            onClick={() => {
              setActiveButton("joinedEvents");
            }}
          >
            Joined events
          </Button>
        </Box>
      </Drawer>

      <Box
        sx={{
          margin: 0,
          padding: 0,
          flexGrow: 1,
          p: 3,
          height: "91vh",
          maxHeight: "91vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            display: activeButton === "myProfile" ? "flex" : "none",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p>{JSON.stringify(user)}</p>
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
          <p>Joined Events</p>
        </Box>
      </Box>
    </Box>
  );
}
