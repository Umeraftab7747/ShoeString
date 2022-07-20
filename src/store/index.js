import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import project from "./projectSlice";
export const store = configureStore({
  reducer: { auth, project },
});
