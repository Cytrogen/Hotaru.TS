import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authSlice from './reducers/authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
/**
 * A custom hook that returns dispatch function from the Redux store.
 * This is recommended to be used instead of useDispatch by Redux Toolkit.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
