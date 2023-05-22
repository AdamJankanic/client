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

import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { addOffer } from "../reducers/Offers.js";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import axiosConfig from "../axiosConfig.js";
import { LocationAutocomplete } from "./LocationAutocomplete.jsx";
import { useMediaQuery } from "@mui/material";

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

export function ModalEditOffer(props) {
  const dispatch = useDispatch();
  let offer = props.offer;

  function getDetails() {
    axiosConfig.get(`/offer/detail/${offer.uuid}`).then((res) => {
      console.log("offer details");
      console.log(res.data);
      offer = res.data;
    });
  }

  React.useEffect(() => {
    console.log("offer detaaaaaails");
    resetToDefaultValues();
    getDetails();
  }, [props.open]);

  function resetToDefaultValues() {
    setOfferTitle(offer.title);
    setOfferLocation(offer.location);
    setOfferPrice(offer.price);
    setOfferDescription(offer.description);
    setCategory(offer.Category.name);
    setState(offer.state);
    setDelivery(offer.delivery);
    setFile(offer.image);
  }

  // handle states
  const [state, setState] = React.useState(offer.state);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  console.log("offer in modal edit offer", offer);
  // handle categories
  const [category, setCategory] = React.useState(offer?.Category?.name);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // upload file
  const [file, setFile] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [fileName, setFileName] = React.useState(null);
  const [fileType, setFileType] = React.useState(null);
  const [fileBase64, setFileBase64] = React.useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    setFile(file);
    setFileName(file.name);
    setFileType(file.type);

    const reader = new FileReader();

    // Set up a function to run when the reader has finished reading the file
    reader.onload = () => {
      // Get the base64-encoded data URL from the result
      const base64Data = reader.result;

      // Use the base64 data as needed, for example:

      setFileBase64(base64Data);
    };

    reader.readAsDataURL(file);

    event.target.value = null;
  };

  const handleDeleteFile = (event) => {
    event.preventDefault();
    setFile(null);
    setFileName(null);
  };

  // handle input changes in form
  const [offerTitle, setOfferTitle] = React.useState(offer.title);
  const [offerLocation, setOfferLocation] = React.useState("");
  const [offerPrice, setOfferPrice] = React.useState(offer.price);
  const [offerDescription, setOfferDescription] = React.useState(
    offer.description
  );
  const handleOfferTitleChange = (event) => {
    setOfferTitle(event.target.value);
  };

  // handle location input

  const handleSetLocation = (location) => {
    console.log("location", location);
    setOfferLocation(location);
  };

  const handleLocationChange = (event) => {
    setOfferLocation(event.target.value);
  };

  // handle price input
  const handlePriceChange = (event) => {
    if (event.target.value >= 0) setOfferPrice(event.target.value);
  };

  // handle description input
  const handleDescriptionChange = (event) => {
    if (event.target.value.length <= 256) {
      setOfferDescription(event.target.value);
    }
  };

  // handle delivery checkbox
  const [offerDelivery, setDelivery] = React.useState(offer.delivery);
  const handleDeliveryChange = (event) => {
    setDelivery(event.target.checked);
  };

  // create an offer
  const handleEditOffer = (event) => {
    const newOffer = {
      uuid: offer.uuid,
      title: offerTitle,
      category: category,
      creator_uuid: user.uuid,
      description: offerDescription,
      state: state,
      price: offerPrice,
      location: offerLocation,
      delivery: offerDelivery,
      image: fileBase64,
      // imageType: file.type,
    };

    if (
      !newOffer.title ||
      !newOffer.category ||
      !newOffer.description ||
      !newOffer.state ||
      !newOffer.price ||
      !newOffer.location
    ) {
      alert("Please fill all the fields");
      return;
    }

    console.log(newOffer);
    // dispatch(addOffer(newOffer));

    // send offer to server
    axiosConfig.put(`/offer/update`, newOffer).then((res) => {
      console.log(res.data);
      props.onClose();
      window.location.reload();
    });
    // axiosCongig.post("/offer/create", newOffer);
  };

  function deleteOffer() {
    axiosConfig.delete(`/offer/delete/${offer.uuid}`).then((res) => {
      console.log(res.data);
      window.location.reload();
    });
  }

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
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Edit an offer</strong>
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
              label="Offer Title"
              variant="filled"
              size="small"
              required
              value={offerTitle}
              onChange={handleOfferTitleChange}
              sx={{
                width: "100%",
                gridColumn: "-1/1",
              }}
            />

            {/* <TextField
              id="filled-basic"
              label="Location"
              variant="filled"
              size="small"
              required
              value={offerLocation}
              onChange={handleLocationChange}
              sx={{
                width: "100%",
              }}
            /> */}
            <LocationAutocomplete handleSetLocation={handleSetLocation} />

            <TextField
              id="filled-basic"
              label="Price"
              variant="filled"
              size="small"
              type={"number"}
              required
              value={offerPrice}
              onChange={handlePriceChange}
              sx={{
                width: "100%",
              }}
            />

            <FormControl fullWidth required variant="filled" size="small">
              <InputLabel id="selectState">Quality</InputLabel>
              <Select
                labelId="selectState"
                label="State"
                value={state}
                onChange={handleStateChange}
              >
                <MenuItem value={"New"}>New</MenuItem>
                <MenuItem value={"Used"}>Used</MenuItem>
                <MenuItem value={"Broken"}>Broken</MenuItem>
              </Select>
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={offerDelivery}
                    onChange={handleDeliveryChange}
                  />
                }
                label="Delivery"
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
                <MenuItem value={"kitchen"}>Kitchen</MenuItem>
                <MenuItem value={"electronics"}>Electronics</MenuItem>
                <MenuItem value={"clothes"}>Clothes</MenuItem>
                {/* <MenuItem value={"furniture"}>Furniture</MenuItem>
                <MenuItem value={"books"}>Books</MenuItem>
                <MenuItem value={"automobile"}>Automobile</MenuItem>
                <MenuItem value={"services"}>Services</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem> */}
              </Select>
            </FormControl>

            {/* <Button onClick={handleUploadClick}>
              Upload a File
            
              <input
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
                multiple={false}
                style={{ display: "none" }}
                accept=".jpg, .jpeg, .png"
              ></input>
            </Button> */}

            {fileName && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <Typography sx={{ alignSelf: "center" }}>{fileName}</Typography>
                <IconButton onClick={handleDeleteFile}>
                  <CloseIcon
                    sx={{
                      color: "red",
                    }}
                  />
                </IconButton>
              </Box>
            )}

            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              variant="filled"
              multiline
              maxRows={4}
              value={offerDescription}
              onChange={handleDescriptionChange}
              sx={{
                gridColumn: "-1/1",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
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
                handleEditOffer();
              }}
            >
              SAVE
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                marginTop: "0.5rem",
                color: "white",
                fontSize: "1.2rem",
                // backgroundColor: "white",
                backgroundColor: "red",
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
              onClick={deleteOffer}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
