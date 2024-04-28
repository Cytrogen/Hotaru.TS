import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/interfaces';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

/**
 * The auth slice contains the current user, the isAuthenticated flag, and the error message.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set the current user and set the isAuthenticated flag to true.
     * @param state
     * @param action
     */
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    /**
     * Set the error message.
     * @param state
     * @param action
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, setError } = authSlice.actions;
export default authSlice.reducer;
