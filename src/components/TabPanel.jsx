import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";

import { Users } from "./Users.jsx";
import { SearchField } from "./SearchField.jsx";

import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";

import { MessageSearch } from "../components/MessageSearch";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  // console.log(children);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children.id}</Typography> */}
          <Users />
          <Users />
          <Users />
          <Users />
          <Users />
          <Users />
        </Box>
      )}
    </div>
  );
}

function TabPanel2(props) {
  const { children, value, index, ...other } = props;

  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };
  const selector = useSelector((state) => state);
  const fetchedMessages = selector.allMessages.messages;
  const active = selector.channelsStore.active;

  const fileredMessages = fetchedMessages.filter((message) => {
    if (searchValue === "") {
      return;
    }
    return message.text.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // {...other}
    >
      <TextField
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleSearchChange}
        size="normal"
        sx={{ width: "100%" }}
      ></TextField>

      {value === index && (
        <Box sx={{ p: 3 }}>
          {fileredMessages.map((message, index) => {
            if (message.channel === active) {
              return <MessageSearch key={index} messages={message} />;
            }
            return;
          })}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

export function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          {/* <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} /> */}

          <Tab
            label="Users"
            sx={{
              width: "50%",
            }}
          />

          <Tab
            label="Search"
            sx={{
              width: "50%",
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} />
      <TabPanel2 value={value} index={1} />
    </Box>
  );
}
