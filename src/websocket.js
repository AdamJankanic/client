import { io } from "socket.io-client";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "./reducers/Messages.js";
import store from "./store.js";

// socket.on("connect", () => {
//   console.log("Connected to WebSocket server");
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected from WebSocket server");
// });

// //disconnect from socket
// function disconnectSocket() {
//   console.log("Disconnecting socket...");
//   socket.disconnect();
// }

// //creating namespace for user on server
// function joinChats(uuid) {
//   console.log("JOINING SOCKET NAMESPACES FOR USER", uuid);
//   socket.emit("joinChat", uuid);
// }

//function to connect to websocket namespace

// function get token and expiration from local storage and check if token is expired
// if token is expired, request new token

let newSocket = null;

async function getToken() {
  let token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiration");

  //check if token is expired
  if (Math.floor(Date.now() / 1000) > tokenExpiry) {
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
      });
  }

  token = localStorage.getItem("token");

  return token;
}

async function connectToChannelNamespace(channelId) {
  const token = await getToken();

  console.log("TOKEN", token);
  console.log("CONNECTING TO CHANNEL NAMESPACE", channelId);
  newSocket = io(
    "https://server-production-412a.up.railway.app/chat/" + channelId,
    // "http://localhost:5000/chat/" + channelId,
    {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    }
  );

  newSocket.on("connect", () => {
    console.log("Connected to Channel Namespace", channelId);
  });

  newSocket.on("disconnect", () => {
    console.log("Disconnected from Channel Namespace", channelId);
  });

  newSocket.on("receive_message", (message) => {
    console.log("Received message:", message);
    const dispatch = store.dispatch;

    dispatch(addMessage(message));
  });
}

// send message to server through websocket
function sendMessageToServer(message) {
  console.log("SENDING MESSAGE TO SERVER");
  console.log(message);
  newSocket.emit("chatMessage", message);
}

//function to disconnect from websocket namespace
function disconnectFromChannelNamespace() {
  console.log("DISCONNECTING FROM CHANNEL NAMESPACE");
  newSocket.disconnect();
}

// const newSocket = io(
//   "http://localhost:5000/chat/15dbe5bc-3645-4cbb-8ac0-0bd6c053d730"
// );

// newSocket.on("connect", () => {
//   console.log("Connected to Channel Namespace");
// });

// newSocket.on("disconnect", () => {
//   console.log("Disconnected from Channel Namespace");
// });

// newSocket.on("receive_message", (message) => {
//   console.log("Received message:", message);
// });

// socket.emit("joinChat", "a45a5324-ddb4-43f2-b325-1a717654c505");

export {
  // socket, joinChats,
  connectToChannelNamespace,
  sendMessageToServer,
};
