import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const sentMessageBox = {
  float: "right",
  width: "25%",
  position: "relative",
  // left: "50%",
};

const receivedMessageBox = {
  width: "25%",
  // float: "left",
};

const receivedMessage = {
  width: "100%",
  borderRadius: "25px",
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 1,
  paddingBottom: 1,
  // backgroundColor: "rgb(0, 107, 141)",
  backgroundColor: "rgb(211,211,211)",

  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
};
const sentMessage = {
  width: "100%",
  borderRadius: "25px",
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 1,
  paddingBottom: 1,
  backgroundColor: "rgb(0, 102, 161)",

  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
};

export function Message(props) {
  // const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  const date = new Date(props.messages.createdAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return (
    <Box>
      <Box
        sx={
          user.uuid === props.messages.sender_uuid
            ? sentMessageBox
            : receivedMessageBox
        }
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "2.5rem",
          }}
        >
          <p>{props.messages.User.username}</p>
          <p>{hours + ":" + minutes}</p>
        </Box>
        <Box
          sx={
            user.uuid === props.messages.sender_uuid
              ? sentMessage
              : receivedMessage
          }
        >
          <Typography
            sx={{
              color:
                user.uuid === props.messages.sender_uuid ? "white" : "black",
              wordWrap: "break-word",
            }}
          >
            {props.messages.content}
          </Typography>

          {/* <a href={"/#"}>{props.messages.fileName}</a> */}
        </Box>
      </Box>
    </Box>
  );
}
