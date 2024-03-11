import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global";
import dialogState from "./dialog";
import renegadesState from "./renegades";

export const store = configureStore({
  reducer: {
    globalState: globalSlice,
    dialogState: dialogState,
    renegadesState: renegadesState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
