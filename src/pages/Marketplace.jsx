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
import { Offer } from "../components/Offer";
import { ModalCreateOffer } from "../components/ModalCreateOffer";
import { ModalOfferDetail } from "../components/ModalOfferDetail";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";

import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addOffer,
  clearOffers,
  setOfferDetailModal,
} from "../reducers/Offers.js";

import axiosConfig from "../axiosConfig.js";
import { useMediaQuery } from "@mui/material";

export function Marketplace() {
  // getting user location
  // React.useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("Geolocation is supported by this browser.");
  //         console.log(position.coords.latitude, position.coords.longitude);
  //         console.log(position);
  //       },
  //       (error) => console.log(error)
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  const getAllEvents = async () => {
    try {
      const response = await axiosConfig.get("/offer/all");
      console.log(response);
      console.log(response.data);

      dispatch(clearOffers());
      response.data.forEach((event) => {
        dispatch(addOffer(event));
      });

      // dispatch(addEvent(response.data));
    } catch (error) {
      console.log(error);
      if (error.response.status === 434) navigate("/verify");
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
    kitchen: false,
    electronics: false,
    clothes: false,
    furniture: false,
    books: false,
    other: false,
    automobile: false,
    services: false,
  });

  //access kitchen from filter

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
    console.log({ ...filter });
    if (searchText.length === 0) setSearchText(" ");
  };

  // alloffers
  const allOffers = selector.offersStore.allOffers;
  const [currentPage, setCurrentPage] = React.useState(1);
  let numberOfPages;

  // displaying 6 offers per page
  let displayingOffers;

  const searchedOffers = allOffers.filter((offer) => {
    if (searchText.length === 0) return true;

    const checkedCategories = Object.keys(filter).filter(
      (category) => filter[category]
    );

    // console.log(checkedCategories);
    return (
      (offer.title.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        offer.description
          .toLowerCase()
          .includes(searchText.toLowerCase().trim()) ||
        offer.location
          .toLowerCase()
          .includes(searchText.toLowerCase().trim())) &&
      (checkedCategories.length === 0 ||
        checkedCategories.includes(offer.Category.name))
    );
  });

  numberOfPages = Math.ceil(searchedOffers.length / 6);

  if (numberOfPages === 1) {
    displayingOffers = searchedOffers.slice(0, 6);
  } else {
    displayingOffers = searchedOffers.slice(
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

  // offer detail modal
  const modalDetail = selector.offersStore.offerDetailModal;
  const handleCloseDetail = () => {
    dispatch(setOfferDetailModal());
  };

  const categoryCheckboxes = useMediaQuery("(min-width: 1175px)");
  const isDesktop = useMediaQuery("(min-width: 1040px)");
  const isMobile = useMediaQuery("(max-width: 520px)");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    console.log("isDesktop: " + isDesktop);
    setDrawerOpen(false);
  }, [isDesktop]);

  return (
    <Box
      sx={{ display: "flex" }}
      // onClick={() => (modal ? setModal(!modal) : null)}
    >
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
          width: isDesktop ? "20%" : isMobile ? "75%" : "40%",
          flexShrink: 0,
          // boxSizing: "border-box",
          [`& .MuiDrawer-paper`]: {
            width: isDesktop ? "20%" : isMobile ? "75%" : "40%",
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

          <Box
            sx={{
              display: "flex",
              gap: categoryCheckboxes || !isDesktop ? "1rem" : 0,
              flexDirection:
                categoryCheckboxes || !isDesktop ? "row" : "column",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.kitchen}
                    onChange={handleFilterChange}
                    name="kitchen"
                  />
                }
                label="Kitchen"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.clothes}
                    onChange={handleFilterChange}
                    name="clothes"
                  />
                }
                label="Clothes"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.electronics}
                    onChange={handleFilterChange}
                    name="electronics"
                  />
                }
                label="Electronics"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.furniture}
                    onChange={handleFilterChange}
                    name="furniture"
                  />
                }
                label="Furniture"
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
            Create an offer
          </Button>
        </Box>
      </Drawer>

      {/* Content Offers */}
      <Box
        sx={{
          width: isDesktop ? "80%" : "100%",
        }}
      >
        <Toolbar />
        <Grid container spacing={4}>
          {displayingOffers.map((offer, index) => {
            return (
              <Grid key={index} item lg={4} sm={6} xs={12}>
                <Offer key={index} offer={offer} />
              </Grid>
            );
          })}
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

      <ModalCreateOffer open={modal} onClose={handleClose} />
      <ModalOfferDetail open={modalDetail} onClose={handleCloseDetail} />
    </Box>
  );
}
