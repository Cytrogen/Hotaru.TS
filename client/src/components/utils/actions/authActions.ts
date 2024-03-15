import { Dispatch } from "redux";
import { User } from "../interfaces";
import { UsersService } from "./serverConnection";
import { setCurrentUser } from "../reducers/authSlice";

/**
 * Emit a register event to the server.
 * The server will emit a newRegisteredUser event with a status code and a message.
 * Code 00000 means success, which will redirect the user to the login page.
 * Any other code will log the message to the console.
 * @param userData
 * @param navigate
 */
const registerUser = (userData: User, navigate: (path: string) => void) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await UsersService.register(userData);
      const data = response.data;
      if (data.status === "00000") navigate("/login");
      else console.log(data.message);
    } catch (error) {
      console.error(error);
    }
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
  return async (dispatch: Dispatch) => {
    try {
      const response = await UsersService.login(userData);
      const data = response.data;
      if (data.status === "00000") {
        const { access_token } = data;
        localStorage.setItem("jwtToken", access_token);
        dispatch(setCurrentUser({
          ...userData,
          access_token,
        }));
        navigate("/");
      } else console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }
}

export { registerUser, loginUser };
