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

import { useDispatch, useSelector } from "react-redux";
import { addChannel } from "../reducers/Channels";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

export function ModalWindow(props) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  // console.log("kanaly: " + useSelector((state) => state.allChannels.channels));

  const [channelState, setChannelState] = React.useState(false);
  const [schoolState, setSchoolState] = React.useState(false);
  const [facultyState, setFacultyState] = React.useState(false);
  const [channelName, setChannelName] = React.useState("");

  // console.log("channel state: " + channelState);
  const handleChannelNameChange = (event) => {
    console.log(event.target);
    setChannelName(event.target.value);
  };

  const handleChange = (event) => {
    setChannelState(!channelState);
    setFacultyState(false);
    setSchoolState(false);
  };

  const handleSchoolChange = (event) => {
    setSchoolState(event.target.checked);
  };

  const handleFacultyChange = (event) => {
    setFacultyState(event.target.checked);
  };

  const createChannel = (event) => {
    const channel = {
      name: channelName.replace(/\s\s+/g, " "),
      isPrivate: !channelState,
      school: schoolState,
      faculty: facultyState,
    };

    // console.log(channelName.replace(/\s/g, ".").replace(".", " "));

    if (channelName.replace(/\s/g, "").length >= 3) {
      console.log(channel);
      dispatch(addChannel(channel));
    } else {
      alert("Channel name should have at least 3 characters.");
    }
    // console.log("state " + channelState);

    setChannelName("");
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
            <strong>Create a new channel</strong>
          </Typography>
          <TextField
            id="filled-basic"
            label="Channel Name"
            variant="filled"
            size="small"
            required
            value={channelName}
            onChange={handleChannelNameChange}
            sx={{
              width: "100%",
            }}
          />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              marginTop: "1rem",
              alignSelf: "center",
            }}
          >
            <Typography>Private</Typography>
            <Switch
              checked={channelState}
              onChange={handleChange}
              // color="info"
              // defaultChecked
            ></Switch>
            <Typography>Public</Typography>
          </Stack>
          {!channelState && (
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={schoolState}
                      onChange={handleSchoolChange}
                    />
                  }
                  label="School"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={facultyState}
                      onChange={handleFacultyChange}
                    />
                  }
                  label="Faculty"
                />
              </FormGroup>
            </div>
          )}
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
            onClick={createChannel}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
