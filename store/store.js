import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../src/features/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
