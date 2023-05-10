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
import { addEvent } from "../reducers/Events.js";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import { current } from "@reduxjs/toolkit";

import moment from "moment";
import "moment-timezone"; // Import Moment.js timezone

import axiosConfig from "../axiosConfig.js";

import { LocationAutocomplete } from "./LocationAutocomplete.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

export function ModalCreateEvent(props) {
  const dispatch = useDispatch();

  // handle categories
  const [category, setCategory] = React.useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // handle input changes in form
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventDuration, setEventDuration] = React.useState(1);
  const [eventPrice, setEventPrice] = React.useState("");
  const [eventCapacity, setEventCapacity] = React.useState(10);
  const [eventDescription, setEventDescription] = React.useState("");
  const [time, setTime] = React.useState(dayjs());
  const [date, setDate] = React.useState(dayjs());

  // handle title input
  const handleEventTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleSetLocation = (location) => {
    console.log("location", location);
    setEventLocation(location);
  };

  // handle duration input
  const handleDurationChange = (event) => {
    if (event.target.value > 0) setEventDuration(event.target.value);
  };

  // handle capacity input
  const handleCapacityChange = (event) => {
    if (event.target.value > 0) setEventCapacity(event.target.value);
  };

  // handle price input
  const handlePriceChange = (event) => {
    if (event.target.value >= 0) setEventPrice(event.target.value);
  };

  // handle description input
  const handleDescriptionChange = (event) => {
    if (event.target.value.length <= 256) {
      setEventDescription(event.target.value);
    }
  };

  // handle delivery checkbox
  const [eventUnlimitedCapacity, setUnlimitedCapacity] = React.useState(false);
  const handleUnlimitedChange = (event) => {
    setUnlimitedCapacity(event.target.checked);
  };

  // create an event
  const handleCreateEvent = (event) => {
    const newEvent = {
      title: eventTitle,
      category: category,
      creator_uuid: user.uuid,
      description: eventDescription,
      capacity: eventUnlimitedCapacity ? 0 : eventCapacity,
      price: eventPrice,
      location: eventLocation,
      joined: 0,
      time: time.toISOString(),
      duration: eventDuration,
      date: date.toISOString(),
    };

    // Parse the ISO string into a Moment.js object
    // const parsedTime = moment(time.toISOString());
    // const localTime = parsedTime.local();
    // const formattedTime = localTime.format("HH:mm");
    // console.log("formated time", formattedTime);

    // dispatch(addEvent(newEvent));
    console.log("new event", newEvent);
    axiosConfig.post("/event/create", newEvent);

    // reset form
    setEventTitle("");
    setEventLocation("");
    setEventPrice("");
    setEventDescription("");
    setCategory("");
    setEventDuration(1);
    setEventCapacity(10);
    setUnlimitedCapacity(false);
    setDate(dayjs());
    setTime(dayjs());
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Create a new event</strong>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
              rowGap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <TextField
              id="filled-basic"
              label="Event Title"
              variant="filled"
              size="small"
              required
              value={eventTitle}
              onChange={handleEventTitleChange}
              sx={{
                width: "100%",
                gridColumn: "-1/1",
              }}
            />

            <LocationAutocomplete handleSetLocation={handleSetLocation} />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={date}
                format="DD/MM/YYYY"
                required
                onChange={(newValue) => setDate(newValue)}
              />

              <TimeField
                label="Time"
                value={time}
                onChange={(newValue) => setTime(newValue)}
                format="HH:mm"
                required
              />
            </LocalizationProvider>

            <TextField
              id="filled-basic"
              label="Duration (in hours)"
              variant="filled"
              size="small"
              type={"number"}
              required
              value={eventDuration}
              onChange={handleDurationChange}
              sx={{
                width: "100%",
              }}
            />

            <TextField
              id="filled-basic"
              label="Price"
              variant="filled"
              size="small"
              type={"number"}
              required
              value={eventPrice}
              onChange={handlePriceChange}
              sx={{
                width: "100%",
              }}
            />

            <TextField
              id="filled-basic"
              label="Capacity"
              variant="filled"
              size="small"
              type={"number"}
              required
              disabled={eventUnlimitedCapacity ? true : false}
              value={eventCapacity}
              onChange={handleCapacityChange}
              sx={{
                width: "100%",
              }}
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eventUnlimitedCapacity}
                    onChange={handleUnlimitedChange}
                  />
                }
                label="Unlimited capacity"
              />
            </FormGroup>

            <FormControl
              fullWidth
              required
              variant="filled"
              size="small"
              sx={{ gridColumn: "-1/1" }}
            >
              <InputLabel id="selectState">Category</InputLabel>
              <Select
                labelId="selectCategory"
                label="Category"
                value={category}
                onChange={handleCategoryChange}
              >
                <MenuItem value={"sports"}>Sports</MenuItem>
                <MenuItem value={"culture"}>Culture</MenuItem>
                <MenuItem value={"party"}>Party</MenuItem>
                <MenuItem value={"games"}>Games</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              variant="filled"
              required
              multiline
              maxRows={4}
              value={eventDescription}
              onChange={handleDescriptionChange}
              sx={{
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
            onClick={() => {
              handleCreateEvent();
              props.onClose();
            }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
