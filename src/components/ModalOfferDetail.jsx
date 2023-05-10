import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";

import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

export function ModalOfferDetail(props) {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);

  const selectedId = selector.offersStore.offerDetailId;

  const selectedOffer = selector.offersStore.allOffers.find(
    (offer) => offer.id === selectedId
  );

  if (selectedId == null) {
    return null;
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* diplaying offer content */}
        <Box sx={style}>
          <img
            src={selectedOffer.image}
            alt="offer file"
            style={{
              width: "100%",
              height: "20rem",
              objectFit: "fit",
              margin: 0,
              padding: 0,
            }}
          ></img>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "60fr 40fr",
              columnGap: "1rem",
              rowGap: "0.5rem",
            }}
          >
            <h2
              style={{
                gridColumn: "-1/1",
                marginTop: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              {selectedOffer.title}
            </h2>
            <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <LocationOnIcon />
              <h3 style={{ marginTop: 0, marginBottom: 0 }}>
                {selectedOffer.place}
              </h3>
            </Box>

            <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <PaymentsIcon />
              <h3 style={{ marginTop: 0, marginBottom: 0 }}>
                {selectedOffer.price}
              </h3>
            </Box>

            <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <StarHalfIcon />
              <h3 style={{ marginTop: 0, marginBottom: 0 }}>
                {selectedOffer.state}
              </h3>
            </Box>

            <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <LocalShippingIcon />
              <h3 style={{ marginTop: 0, marginBottom: 0 }}>
                {selectedOffer.delivery ? "Delivery" : "Pickup"}
              </h3>
            </Box>

            <div
              style={{
                gridColumn: "-1/1",
                wordWrap: "break-word",
              }}
            >
              <Typography
                sx={{
                  // gridColumn: "-1/1",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {selectedOffer.description}
              </Typography>
            </div>
          </Box>

          {/* contact user button */}
          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "0.5rem",
              color: "white",
              fontSize: "1.2rem",
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
          >
            Contact User
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
