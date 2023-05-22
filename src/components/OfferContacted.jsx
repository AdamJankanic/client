import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import imageSrc from "../automobilka-mg.jpg";

// icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useDispatch, useSelector } from "react-redux";
import { setOfferDetailId, setOfferDetailModal } from "../reducers/Offers.js";
import axiosConfig from "../axiosConfig";

export function OfferContacted(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  function leaveOffer() {
    console.log("leaveOffer");
    axiosConfig
      .post("/offer/leave", {
        user_uuid: user.uuid,
        offer_uuid: props.offer.uuid,
      })
      .then((response) => {
        console.log(response);
        alert("You have left the offer!");
        window.location.reload();
      });
  }

  return (
    <Box
      sx={{
        cursor: "pointer",
        margin: "0.5rem",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      }}
    >
      <img
        src={props.offer.image}
        alt="offer file"
        style={{
          width: "100%",
          height: "11rem",
          objectFit: "fill",
          margin: 0,
          padding: 0,
        }}
      ></img>

      <Box sx={{ padding: "0.25rem" }}>
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
            {props.offer.title}
          </h2>
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <LocationOnIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              {/* {props.offer.location} */}
              {props.offer.location.length > 15
                ? props.offer.location.substring(0, 12) + "..."
                : props.offer.location}
            </h3>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <PaymentsIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              {props.offer.price}
            </h3>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <StarHalfIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              {props.offer.state}
            </h3>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <LocalShippingIcon />
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              {props.offer.delivery ? "Delivery" : "Pickup"}
            </h3>
          </Box>
          <Typography
            sx={{ gridColumn: "-1/1", marginTop: 0, marginBottom: "0.5rem" }}
          >
            {props.offer.description.length > 30
              ? props.offer.description.substring(0, 39) + "..."
              : props.offer.description}
          </Typography>
        </Box>
      </Box>

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
        onClick={leaveOffer}
      >
        Leave
      </Button>
    </Box>
  );
}
