import * as React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

export function LocationMap(props) {
  const [map, setMap] = React.useState(null);
  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const originRef = React.useRef();
  const destiantionRef = React.useRef();
  const [libraries] = React.useState(["places"]);

  const center = {
    lat: 45.0941,
    lng: 40.5038,
  };
  // const { isLoaded } = false;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCleldzdzfKKy_s-Jk9S56UxxX6dwxvxpo",
    libraries,
  });

  return isLoaded ? (
    <>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
          }}
        >
          <Box>
            <GoogleMap
              center={center}
              zoom={5}
              mapContainerStyle={{ width: "100%", height: "50vh" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {props.directionsResponse && (
                <DirectionsRenderer directions={props.directionsResponse} />
              )}
            </GoogleMap>
          </Box>
        </Box>
      </Modal>
    </>
  ) : (
    <></>
  );
}
// Compare this snippet from src\components\Navbar.jsx:
