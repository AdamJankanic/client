import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import ListItem from "@mui/material/ListItem";

import InputAdornment from "@mui/material/InputAdornment";

import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
// import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Message } from "../components/Message";
import { Channel } from "../components/Channel";

import {
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { addChannel, clearStore } from "../reducers/Channels";
import { addMessage, removeMessages } from "../reducers/Messages";
import { activeChannel, addWebsocket } from "../reducers/Channels";

import axiosConfig from "../axiosConfig.js";

import {
  connectToChannelNamespace,
  sendMessageToServer,
} from "../websocket.js";

import { v4 as uuidv4 } from "uuid";

const useChannel = {
  alignItems: "center",
  // alignSelf: "center",
  height: "3.5rem",
  width: "95%",
  marginBottom: "0.5rem",
  cursor: "pointer",
  borderRadius: "15px",
  backgroundImage:
    "radial-gradient(circle at 10% 20%, rgb(26, 178, 203) 0%, rgb(0, 102, 161) 90.1%)",
  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
};

const nonUseChannel = {
  alignItems: "center",
  // alignSelf: "center",
  height: "3.5rem",
  width: "95%",
  marginBottom: "0.5rem",
  cursor: "pointer",
  borderRadius: "15px",

  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",

  border: "8px solid rgb(26, 178, 203)",
};

const messageContainer = {
  width: "20%",
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  // backgroungColor: "red",
};

export function Test() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const navigate = useNavigate();
  // const classes = useStyles();

  const active = selector.channelsStore.active;
  const joinedWebsocket = selector.channelsStore.activeWebsockets;

  // fetch all chats
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return navigate("/signin");

    axiosConfig
      .get(`/chat/mychats/${user.uuid}`)
      .then((response) => {
        dispatch(clearStore());

        response.data.forEach((channel) => {
          dispatch(addChannel(channel));
        });
      })

      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 434) navigate("/verify");
      });
  }, []);

  // search offers
  const [searchText, setSearchText] = React.useState("");
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const [text, setText] = React.useState("");

  const [radioValue, setSelectedValue] = React.useState("all");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //fetch messages for chat
  React.useEffect(() => {
    if (active == 1 || active == undefined) return;

    axiosConfig.get(`/chat/messages/${active}`).then((response) => {
      console.log(response.data);
      dispatch(removeMessages());
      response.data.forEach((message) => {
        dispatch(addMessage(message));
      });
    });
  }, [active]);

  // messages and channels from store
  const fetchedMessages = selector.allMessages.messages;
  const fetchedChannels = selector.channelsStore.channels;

  let displayChannels = fetchedChannels.filter((channel) => {
    if (radioValue === "all") {
      return channel;
    } else if (radioValue === "offers") {
      return channel.Offer?.title !== undefined;
    } else if (radioValue === "events") {
      return channel.Event?.title !== undefined;
    }
  });

  displayChannels = displayChannels.filter((channel) => {
    console.log("kaaaaanaaaaaal", channel);
    const channelName = channel.Event?.title || channel.Offer?.title;
    if (searchText === "") {
      return channel;
    } else if (channelName.toLowerCase().includes(searchText.toLowerCase())) {
      return channel;
    }
  });

  // active channel
  function clickedChannel(id) {
    console.log("active channel: " + id);

    console.log("joined websockets: " + joinedWebsocket);
    console.log("idecko: " + id);
    if (joinedWebsocket.includes(id)) {
      dispatch(activeChannel(id));
      return;
    }

    dispatch(addWebsocket(id));
    connectToChannelNamespace(id);

    dispatch(activeChannel(id));
  }

  // message text
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  function sendMessage(event) {
    const user = JSON.parse(localStorage.getItem("user"));

    const newMessage = {
      id: uuidv4(),
      sender_uuid: user.uuid,
      content: text.trim(),
    };

    console.log("dispatched message");
    console.log(newMessage);

    sendMessageToServer(newMessage);
    dispatch(addMessage(newMessage));

    setText("");
  }

  //scroll to bottom of messages
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [fetchedMessages]);

  return (
    <Box
      sx={{ display: "flex" }}
      // onClick={() => (modal ? setModal(!modal) : null)}
    >
      <CssBaseline />
      <Navbar />

      {/* left drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: "20%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "20%",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <Toolbar />
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "0.5rem",
          }}
        >
          <TextField
            variant="standard"
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <IconButton> */}
                  <SearchIcon />
                  {/* </IconButton> */}
                </InputAdornment>
              ),
            }}
            size="normal"
            sx={{
              width: "95%",
              height: "1rem",
              marginBottom: "1rem",
            }}
          ></TextField>
        </Box>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="all"
            value={radioValue}
            onChange={handleRadioChange}
            name="radio-buttons-group"
            style={{
              // backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              margin: "0.5rem",
            }}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="events"
              control={<Radio />}
              label="Events"
            />
            <FormControlLabel
              value="offers"
              control={<Radio />}
              label="Offers"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ overflow: "auto" }}>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {displayChannels.map((channel, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ListItem
                  key={index}
                  disablePadding
                  sx={active === channel.uuid ? useChannel : nonUseChannel}
                  onClick={clickedChannel.bind(this, channel.uuid)}
                  className={""}
                >
                  <Channel
                    key={index}
                    channel={channel}
                    activeChannel={active}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        // component="main"
        sx={{
          margin: 0,
          padding: 0,
          flexGrow: 1,
          p: 3,
          height: "91vh",
          maxHeight: "91vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        {/* <Message messages={messages[0]} /> */}
        {fetchedMessages.map((message, index) => {
          console.log("SPRAVA", message);
          return <Message key={index} messages={message} />;
        })}
        {/* <Message /> */}
        <div ref={messagesEndRef} />
      </Box>
      <TextField
        value={text}
        margin="normal"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        // required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Send a message">
                <IconButton onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        id="messageInput"
        // label="Message"
        name="messageInput"
        // autoFocus
        sx={{
          // backgroundColor: "#EDEDED",
          width: "80%",
          position: "fixed",
          left: "20%",
          bottom: 0,
        }}
      ></TextField>
    </Box>
  );
}
