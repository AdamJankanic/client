import * as React from "react";
import imageSrc from "../obrazok.png";
import { Box, Button, Typography } from "@mui/material";

// icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsIcon from "@mui/icons-material/Payments";

import TimerIcon from "@mui/icons-material/Timer";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";

import { useJsApiLoader } from "@react-google-maps/api";
import { LocationMap } from "./LocationMap";
import axiosConfig from "../axiosConfig";
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export function Event(props) {
  const [modal, setModal] = React.useState(false);
  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const handleClose = () => {
    console.log("handleCloseeeeeeeeeeeeeeeeee");
    setModal(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const event = props.event;
  const userLocation = props.userLocation;

  // Create Date object from string
  const date = new Date(event.date);

  // Extract day, month, and year from Date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Add 1 to month as it's zero-indexed
  const year = date.getFullYear();

  // Format date string
  const dateString = `${day}/${month}/${year}`;

  const time = new Date(event.time);

  // Extract hours and minutes from Date object
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  // Format time string
  const timeString = `${formattedHours}:${formattedMinutes}`;

  const [libraries] = React.useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  async function sendLocation() {
    if (modal) return;
    console.log("sendLocation");

    if (event.location === "" || userLocation === "") {
      alert("You are not sharing your location");
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: userLocation.latitude, lng: userLocation.longitude },
      destination: event.location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
    setModal(true);
  }

  async function joinEvent() {
    await axiosConfig
      .post("/event/join", {
        user_uuid: user.uuid,
        event_uuid: event.uuid,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          alert("You have already joined this event");
        } else if (response.status === 200) {
          alert("You have successfully joined this event");
        }
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      });
  }

  return (
    <Box
      style={{
        // width: "25%",
        cursor: "pointer",
        // height: "20rem",
        // margin: "auto",
        // marginTop: "2rem",
        margin: "0.5rem",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      }}
    >
      <div style={{ padding: "0.25rem" }}>
        <Box
          onClick={sendLocation}
          sx={{
            display: "grid",
            gridTemplateColumns: "60fr 40fr",
            columnGap: "3rem",
            rowGap: "0.5rem",
            margin: 0,
            padding: "1rem",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ gridColumn: "-1/1", marginTop: 0, marginBottom: 0 }}>
            {event.title}
          </h2>

          <Box
            sx={{
              display: "flex",
              gap: "0.25rem",
              alignItems: "center",
              gridColumn: "-1/1",
            }}
          >
            <LocationOnIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              {/* {event.location} */}
              {event.location.length > 15
                ? event.location.substring(0, 12) + "..."
                : event.location}
            </h3>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <EventIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>{dateString}</h3>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <AccessTimeFilledIcon />

            <h3 style={{ marginTop: 0, marginBottom: 0 }}>{timeString}</h3>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <TimerIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>{event.duration}h</h3>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <PaymentsIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>{event.price}</h3>
          </Box>

          {/* <h3 style={{ marginTop: 0, marginBottom: 0 }}>17:00</h3>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>31.10.2022</h3>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>2h</h3>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Zadarmo</h3> */}
          <div
            style={{
              gridColumn: "-1/1",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <GroupsIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>{event.joined}</h3>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>/</h3>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              {event.capacity === 0 ? "unlimited" : event.capacity}
            </h3>
          </div>
          <Box
            sx={{
              gridColumn: "-1/1",
              display: "flex",
              marginTop: 0,
              height: "5rem",

              alignItems:
                event.description.length < 100 ? "center" : "flex-start",
              overflow: event.description.length > 100 ? "scroll" : "hidden",
              overflowX: "hidden",
            }}
          >
            <Typography
              sx={
                {
                  // alignSelf: "center",
                }
              }
            >
              {event.description}
            </Typography>
          </Box>
        </Box>
      </div>

      <Button
        disabled={
          (event.joined === event.capacity && event.capacity !== 0) ||
          user.uuid === event.creator_uuid
        }
        variant="contained"
        sx={{
          width: "100%",
          marginTop: "0.5rem",
          color: "white",
          fontSize: "1.2rem",
          borderRadius: "0px 0px 15px 15px",
          // backgroundColor: "white",
          backgroundColor: "rgb(0, 107, 141)",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          padding: "0.1rem 1rem",
          alignSelf: "center",
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          ":hover": {
            backgroundColor: "#DDD",
            boxShadow: "none",
          },
        }}
        onClick={joinEvent}
      >
        Join
      </Button>

      <LocationMap
        directionsResponse={directionsResponse}
        open={modal}
        onClose={handleClose}
      ></LocationMap>
    </Box>
  );
}
