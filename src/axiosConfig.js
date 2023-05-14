import axios from "axios";

async function checkAuth() {
  const token = localStorage.getItem("token");
  // const refreshToken = localStorage.getItem("refreshToken");
  const tokenExpiry = localStorage.getItem("tokenExpiration");
  const refreshTokenExpiry = localStorage.getItem("refreshExpiration");

  console.log("token expiration: " + tokenExpiry);
  console.log("refresh token expiration: " + refreshTokenExpiry);
  console.log("current time: " + Math.floor(Date.now() / 1000));

  if (!token || !tokenExpiry) {
    // user is not logged in
    console.log("user is not logged in");

    return false;
  }

  // check if token is expired
  if (Math.floor(Date.now() / 1000) > tokenExpiry) {
    console.log("token is expired");
    // token is expired, check if refresh token is still valid
    if (Math.floor(Date.now() / 1000) > refreshTokenExpiry) {
      console.log("refresh token is expired");
      // refresh token is also expired, redirect to login page
      return false;
    } else {
      console.log("refresh token is valid");
      // refresh token is still valid, request new access token
      await axios
        // .get("http://127.0.0.1:5000/api/user/refresh", {
        //   withCredentials: true,
        // })
        .get("https://server-production-412a.up.railway.app/api/user/refresh", {
          withCredentials: true,
        })
        .then((response) => {
          const { token, expiration, refreshExpiration } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("tokenExpiration", expiration);
          localStorage.setItem("refreshExpiration", refreshExpiration);

          console.log("token refreshed");
          console.log(token);
          console.log(expiration);
          console.log(refreshExpiration);

          localStorage.setItem("token", token);
          localStorage.setItem("tokenExpiration", expiration);
          localStorage.setItem("refreshExpiration", refreshExpiration);
        })
        .catch((error) => {
          console.log("error refreshing token");
          console.log(error);
          return false;
        });

      // await fetch(
      //   "https://server-production-412a.up.railway.app/api/user/refresh",
      //   {
      //     method: "GET",
      //     credentials: "include", // Include credentials for cross-site requests
      //   }
      // )
      //   .then((response) => {
      //     // console.log("response: ", response.json());
      //     return response.json();
      //   })
      //   .then((data) => {
      //     const { token, expiration, refreshExpiration } = data;
      //     console.log("ukazte data: ", data);
      //     // localStorage.setItem("token", token);
      //     // localStorage.setItem("tokenExpiration", expiration);
      //     // localStorage.setItem("refreshExpiration", refreshExpiration);

      //     console.log("Token refreshed");
      //     console.log(token);
      //     console.log(expiration);
      //     console.log(refreshExpiration);
      //   })
      //   .catch((error) => {
      //     console.error("Error refreshing token:");
      //     console.log(error);
      //   });

      return true;
    }
    // return 145;
  } else {
    console.log("token is valid");
    // token is still valid, set axios authorization header
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    return true;
  }
}

const instance = axios.create({
  // .. where we make our configurations
  baseURL: "https://server-production-412a.up.railway.app/api",
  // baseURL: "http://127.0.0.1:5000/api",
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  if (
    config.url === "/user/login" ||
    config.url === "/user/register" ||
    config.url.includes("/user/logout")
  ) {
    console.log("gg we won");
    return config;
  }

  if (await checkAuth()) {
    console.log("auth is valid");
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    // console.log(config.headers.Authorization);
    return config;
  } else {
    console.log("auth is not valid");
    // redirect to login page
    window.location.href = "/signin";
  }
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

// Also add/ configure interceptors && all the other cool stuff

export default instance;
