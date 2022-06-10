import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer
});

export const store = configureStore({
  reducer: rootReducer
});