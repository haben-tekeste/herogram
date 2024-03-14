import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../store/slices/auth"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

