import { configureStore } from '@reduxjs/toolkit'
import cardReducer from "./reducer"

export const store = configureStore({
  reducer: {
    card: cardReducer
  },
});