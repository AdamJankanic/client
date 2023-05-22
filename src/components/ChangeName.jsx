import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/*** DATE PICKER ***/
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";

import axiosConfig from "../axiosConfig.js";

import { useMediaQuery } from "@mui/material";

export function ChangeName(props) {
  const dispatch = useDispatch();

  // handle input changes in form
  const [username, setUsername] = React.useState("");

  // handle title input
  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const isMedium = useMediaQuery("(max-width: 700px)");
  const isSmall = useMediaQuery("(max-width: 480px)");

  return (
    <div>
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
            width: isSmall ? "95%" : isMedium ? "80%" : "40rem",
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            overflow: "scroll",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Change Username</strong>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isSmall
                ? "8rem 8rem"
                : isMedium
                ? "11rem 11rem"
                : "1fr 1fr",
              columnGap: "1rem",
              rowGap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <TextField
              id="filled-basic"
              label="New Username"
              variant="filled"
              size="small"
              required
              value={username}
              onChange={handleUserNameChange}
              sx={{
                width: "auto",
                gridColumn: "-1/1",
              }}
            />
          </Box>

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
            onClick={() => {}}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
