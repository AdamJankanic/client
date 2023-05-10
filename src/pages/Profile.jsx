import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  TextField,
  Toolbar,
} from "@mui/material";
import { Navbar } from "../components/Navbar";

// const useStyles = makeStyles({
//   buttonDesign: {
//     width: "90%",
//     color: "white",
//     fontSize: "1.2rem",
//     // backgroundColor: "rgb(0, 107, 141)",
//     backgroundColor: "red",
//     // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
//     padding: "0.1rem 1rem",
//     alignSelf: "center",
//     boxShadow:
//       "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
//     ":hover": {
//       backgroundColor: "#DDD",
//       boxShadow: "none",
//     },
//   },
// });

export function Profile() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Navbar />
      {/* ---------------------------------------------------------------------------- */}
      {/* left drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: "20%",
          flexShrink: 0,
          // boxSizing: "border-box",
          [`& .MuiDrawer-paper`]: {
            width: "20%",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
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
            // value={searchText}
            // onChange={handleSearchChange}
            InputProps={{}}
            size="normal"
            sx={{
              width: "95%",
              height: "1rem",
              marginBottom: "1rem",
            }}
          ></TextField>

          <Button
            variant="contained"
            sx={{
              width: "90%",

              color: "white",
              fontSize: "1.2rem",
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
            // onClick={() => setModal(true)}
          >
            My offers
          </Button>

          {/* <Button className={classes.buttonDesign}>
            <h3>My events</h3>
          </Button> */}

          <Button>
            <h3>My profile</h3>
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
