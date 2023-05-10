import {
  AppBar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Event } from "../components/Event";
import { ModalCreateEvent } from "../components/ModalCreateEvent";
import { Navbar } from "../components/Navbar";

import { useNavigate } from "react-router-dom";

import * as React from "react";
import axiosConfig from "../axiosConfig.js";
// import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addEvent, clearStore } from "../reducers/Events";
import { useMediaQuery } from "@mui/material";

export function Events() {
  const [userLocation, setUserLocation] = React.useState("");

  // getting user location
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation is supported by this browser.");
          console.log(position.coords.latitude, position.coords.longitude);
          console.log(position);
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.log(error)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  //function to create a user
  const getAllEvents = async () => {
    try {
      // const response = await axiosConfig.post("/user/create", event);
      const response = await axiosConfig.get("/event/all");
      console.log(response);
      console.log(response.data);

      dispatch(clearStore());
      response.data.forEach((event) => {
        dispatch(addEvent(event));
      });

      // dispatch(addEvent(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllEvents();
  }, []);

  /************************************/
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  // search offers
  const [searchText, setSearchText] = React.useState("");
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // filters categories
  const [filter, setFilter] = React.useState({
    sports: false,
    games: false,
    party: false,
    culture: false,
  });

  //access kitchen from filter

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
    console.log({ ...filter });
  };

  // allEvents
  const allEvents = selector.eventsStore.allEvents;

  console.log(allEvents);

  const [currentPage, setCurrentPage] = React.useState(1);
  let numberOfPages;

  // displaying 6 offers per page
  let displayingEvents;

  const searchedOffers = allEvents.filter((event) => {
    if (searchText.length === 0) return true;

    const checkedCategories = Object.keys(filter).filter(
      (category) => filter[category]
    );

    // console.log(checkedCategories);
    return (
      (event.title.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        event.description
          .toLowerCase()
          .includes(searchText.toLowerCase().trim()) ||
        event.location
          .toLowerCase()
          .includes(searchText.toLowerCase().trim())) &&
      (checkedCategories.length === 0 ||
        checkedCategories.includes(event.Category.name))
    );
  });

  // pagination calculation and displaying offers
  numberOfPages = Math.ceil(searchedOffers.length / 6);

  if (numberOfPages === 1) {
    displayingEvents = searchedOffers.slice(0, 6);
  } else {
    displayingEvents = searchedOffers.slice(
      (currentPage - 1) * 6,
      (currentPage - 1) * 6 + 6
    );
  }

  // setting up pagination
  const handlePagination = (event, page) => {
    setCurrentPage(page);
  };

  // create offer modal
  const [modal, setModal] = React.useState(false);
  const handleClose = () => {
    setModal(false);
  };

  const isDesktop = useMediaQuery("(min-width: 1040px)");

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    console.log("isDesktop: " + isDesktop);
    setDrawerOpen(false);
  }, [isDesktop]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuIcon
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          display: isDesktop ? "none" : "block",
          color: "white",
          zIndex: 10000,
        }}
        onClick={() => setDrawerOpen(!drawerOpen)}
      />
      <Navbar />
      {/* ---------------------------------------------------------------------------- */}
      {/* left drawer */}
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        sx={{
          width: isDesktop ? "20%" : "40%",
          flexShrink: 0,
          // boxSizing: "border-box",
          [`& .MuiDrawer-paper`]: {
            width: isDesktop ? "20%" : "40%",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={drawerOpen}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            height: "100%",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: "0.2rem",
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

          <Box sx={{ display: "flex", gap: "1rem" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.sports}
                    onChange={handleFilterChange}
                    name="sports"
                  />
                }
                label="Sports"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.culture}
                    onChange={handleFilterChange}
                    name="culture"
                  />
                }
                label="Culture"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.party}
                    onChange={handleFilterChange}
                    name="party"
                  />
                }
                label="Party"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.games}
                    onChange={handleFilterChange}
                    name="games"
                  />
                }
                label="Games"
              />
            </FormGroup>
          </Box>

          <Button
            variant="contained"
            sx={{
              width: "90%",
              // position: "fixed",
              position: "absolute",
              bottom: 10,
              // marginTop: "10rem",
              color: "white",
              fontSize: "1.2rem",
              // backgroundColor: "white",
              backgroundColor: "rgb(0, 107, 141)",
              // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              padding: "0.1rem 1rem",
              alignSelf: "center",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              ":hover": {
                backgroundColor: "#DDD",
                boxShadow: "none",
              },
            }}
            onClick={() => setModal(true)}
          >
            Create an event
          </Button>
        </Box>
      </Drawer>

      {/* Content Events */}
      <Box
        sx={{
          width: isDesktop ? "80%" : "100%",
        }}
      >
        <Toolbar />
        <Grid container spacing={4}>
          {displayingEvents.map((event, index) => (
            <Grid key={index} item lg={4} sm={6} xs={12}>
              <Event key={index} event={event} userLocation={userLocation} />
            </Grid>
          ))}
          {/* <Grid item lg={4} sm={6} xs={12}>
            <Event />
          </Grid> */}
        </Grid>

        <Stack alignItems="center">
          <Pagination
            count={numberOfPages}
            shape="rounded"
            page={numberOfPages === 1 ? 1 : currentPage}
            onChange={handlePagination}
            sx={{
              marginTop: "2rem",
            }}
          />
        </Stack>
      </Box>

      <ModalCreateEvent open={modal} onClose={handleClose} />
    </Box>
  );
}
