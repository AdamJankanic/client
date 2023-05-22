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
import { ModalEditEvent } from "./ModalEditEvent";

export function EventJoined(props) {
  const [modal, setModal] = React.useState(false);

  const handleClose = () => {
    setModal(false);
    console.log("handleCloseeeeeeeeeeeeeeeeee");
    return false;
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const event = props.event;

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

  function leaveEvent() {
    console.log("leaveEvent");
    console.log(user.uuid);
    console.log(event.uuid);
    axiosConfig
      .post("/event/leave", {
        user_uuid: user.uuid,
        event_uuid: event.uuid,
      })
      .then((res) => {
        console.log(res);
        alert("You have left the event!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box
      style={{
        cursor: "pointer",
        margin: "0.5rem",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      }}
    >
      <div style={{ padding: "0.25rem" }}>
        <Box
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
        variant="contained"
        sx={{
          width: "100%",
          marginTop: "0.5rem",
          color: "white",
          fontSize: "1.2rem",
          borderRadius: "0px 0px 15px 15px",
          // backgroundColor: "white",
          backgroundColor: "red",
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
        onClick={leaveEvent}
      >
        Leave
      </Button>
    </Box>
  );
}
