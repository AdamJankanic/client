// import * as React from "react";
// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// export function LocationMap() {
//   const [map, setMap] = React.useState(null);
//   const [directionsResponse, setDirectionsResponse] = React.useState(null);
//   const originRef = React.useRef();
//   const destiantionRef = React.useRef();
//   const [libraries] = React.useState(["places"]);

//   const center = {
//     lat: 7.8731,
//     lng: 80.7718,
//   };
//   // const { isLoaded } = false;
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyCleldzdzfKKy_s-Jk9S56UxxX6dwxvxpo",
//     libraries,
//   });

//   async function calculateRoute() {
//     if (originRef.current.value === "" || destiantionRef.current.value === "") {
//       return;
//     }
//     const directionsService = new window.google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destiantionRef.current.value,
//       travelMode: window.google.maps.TravelMode.DRIVING,
//     });
//     setDirectionsResponse(results);
//   }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     originRef.current.value = "";
//     destiantionRef.current.value = "";
//   }

//   return isLoaded ? (
//     <>
//       <div>
//         <div>
//           <div>
//             <Autocomplete>
//               <input
//                 type="text"
//                 name="Origin"
//                 placeholder="Origin"
//                 ref={originRef}
//               />
//             </Autocomplete>
//           </div>
//           <div>
//             <Autocomplete>
//               <input
//                 type="text"
//                 name="Destication"
//                 placeholder="Destication"
//                 ref={destiantionRef}
//               />
//             </Autocomplete>
//           </div>
//           <div>
//             <button type="submit" name="submit" onClick={calculateRoute}>
//               Search
//             </button>
//           </div>
//           <div>
//             <button type="submit" name="clear" onClick={clearRoute}>
//               Clear
//             </button>
//           </div>
//         </div>
//       </div>
//       <GoogleMap
//         center={center}
//         zoom={5}
//         mapContainerStyle={{ width: "100%", height: "100vh" }}
//         options={{
//           zoomControl: false,
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//         onLoad={(map) => setMap(map)}
//       >
//         <Marker position={center} />
//         {directionsResponse && (
//           <DirectionsRenderer directions={directionsResponse} />
//         )}
//       </GoogleMap>
//     </>
//   ) : (
//     <></>
//   );
// }
// // Compare this snippet from src\components\Navbar.jsx:
