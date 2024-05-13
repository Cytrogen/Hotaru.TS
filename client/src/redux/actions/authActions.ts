import { Dispatch } from 'redux'
import { User } from '../../types/interfaces'
import { AuthService, UserService } from './serverConnection'
import { setCurrentUser } from '../reducers/authSlice'

/**
 * Emit a register event to the server.
 * The server will emit a newRegisteredUser event with a status code and a message.
 * Code 00000 means success, which will redirect the user to the login page.
 * Any other code will log the message to the console.
 * @param userData
 * @param navigate
 */
export const registerUser = (userData: User, navigate: (path: string) => void) => {
  return async () => {
    try {
      const response = await AuthService.register(userData)
      const data = response.data
      console.log(data.message)
      if (data.status === '00000') navigate('/login')
    } catch (error) {
      console.error(error)
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
export const loginUser = (userData: User, navigate: (path: string) => void) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.login(userData)
      const data = response.data
      if (data.status === '00000') {
        localStorage.setItem('jwtToken', data.token)
        localStorage.setItem('userId', data.userId)
        dispatch(
          setCurrentUser({
            ...userData,
            access_token: data.token,
            _id: data.userId,
          }),
        )
        // console.log(data)
        navigate('/')
      } else console.log(data.message)
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * Get the user details by user ID.
 * Dispatch the setCurrentUser action with the user data.
 * - id
 * - username
 * - emailAddress
 * - birthday
 * @param userId
 */
export const setUserDetails = (userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('jwtToken')
      const response = await UserService.getUserByUserId(token, userId)
      if (response.status === 200) {
        dispatch(setCurrentUser(response.data))
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
