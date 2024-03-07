import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global";

export const store = configureStore({
  reducer: {
    globalState: globalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
