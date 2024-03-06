import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalSlice";
const rootReducer = combineReducers({
  modal: modalSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
