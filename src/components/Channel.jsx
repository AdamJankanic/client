import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";

import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
//
import { useSelector } from "react-redux";

export function Channel(props) {
  const selector = useSelector((state) => state);
  const { channel } = props;
  const [active, setActive] = React.useState(1);

  const activeChannel = selector.channelsStore.active;
  const channelName = channel.Event?.title || channel.Offer?.title;

  let dateString = null;
  let timeString = null;
  if (channel.Event) {
    const date = new Date(channel.Event.date);

    // Extract day, month, and year from Date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Add 1 to month as it's zero-indexed
    const year = date.getFullYear();

    // Format date string
    dateString = `${day}/${month}/${year}`;

    const time = new Date(channel.Event.time);

    // Extract hours and minutes from Date object
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    // Format time string
    timeString = `${formattedHours}:${formattedMinutes}`;
  }

  console.log(channel);

  // const classes = useStyles();
  return (
    <Box
      sx={{
        width: "95%",
        right: "5%",
        borderRadius: "15rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alighContent: "center",
          padding: "0.75rem",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            color: activeChannel === channel.uuid ? "#fff" : "black",
          }}
        >
          {channelName.length > 10
            ? channelName.substring(0, 5) + "..."
            : channelName}
        </Typography>
        <Typography
          sx={{
            color: activeChannel === channel.uuid ? "#fff" : "black",
          }}
        >
          {channel.Event ? dateString : null}
        </Typography>
        <Typography
          sx={{
            color: activeChannel === channel.uuid ? "#fff" : "black",
          }}
        >
          {channel.Event ? timeString : null}
        </Typography>
      </Box>
    </Box>
  );
}
