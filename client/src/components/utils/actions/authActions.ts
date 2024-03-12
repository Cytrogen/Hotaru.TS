import { Dispatch } from "redux";
import socketIO from "socket.io-client";
import { User } from "../interfaces";
import { setCurrentUser } from "../reducers/authSlice";

/**
 * Create a new socket connection.
 * The client will connect to the server at port 4000.
 */
const socket = socketIO("http://localhost:4000");

/**
 * Emit a register event to the server.
 * The server will emit a newRegisteredUser event with a status code and a message.
 * Code 00000 means success, which will redirect the user to the login page.
 * Any other code will log the message to the console.
 * @param userData
 * @param navigate
 */
const registerUser = (userData: User, navigate: (path: string) => void) => {
  return (dispatch: Dispatch) => {
    socket.emit("register", userData);
    socket.on("newRegisteredUser", data => {
      data.status === "00000" ? navigate("/login") : console.log(data.message);
    });
  }
}

/**
 * Emit a login event to the server.
 * The server will emit a loggedInUser event with a status code and a message.
 * Code 00000 means success, which will redirect the user to the home page.
 * Within the data object, there will be a token that will be stored in the local storage; this JWT token will be used to authenticate the user.
 * Any other code will log the message to the console.
 * @param userData
 * @param navigate
 */
const loginUser = (userData: User, navigate: (path: string) => void) => {
  return (dispatch: Dispatch) => {
    socket.emit("login", userData);
    socket.on("loggedInUser", data => {
      if (data.status === "00000") {
        const { token } = data;
        localStorage.setItem("jwtToken", token);
        userData["token"] = token;
        dispatch(setCurrentUser({...userData, id: 1}));
        navigate("/");
      } else {
        console.log(data.message);
      }
    });
  }
}

export default socket;
export { registerUser, loginUser };
