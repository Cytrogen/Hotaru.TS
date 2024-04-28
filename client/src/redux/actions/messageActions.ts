import socketIO from "socket.io-client";

/**
 * Create a new socket connection.
 * The client will connect to the server at port 4000.
 */
const socket = socketIO("http://localhost:3001", {
  withCredentials: true,
});

export default socket;
