import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import reducer from "./index";

const rootReducer = (context: any) =>
  configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper(rootReducer, {
  debug: process.env.NODE_ENV !== "production",
});
