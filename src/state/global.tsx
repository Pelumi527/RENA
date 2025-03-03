import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface globalStates {
  step: number;
  initialized: boolean;
  visitorMode: boolean;
  refresh: boolean;
}

const initialState: globalStates = {
  step: 0,
  initialized: false,
  visitorMode: false,
  refresh: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    resetGlobal: (state, action: PayloadAction<boolean>) => {
      state.step = 0;
      state.initialized = false;
      state.visitorMode = false;
    },
    updateStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    updateVisitorMode: (state, action: PayloadAction<boolean>) => {
      state.visitorMode = action.payload;
    },
    updateRefresh: (state, action: PayloadAction<boolean>) => {
      state.refresh = action.payload;
    },
  },
});

export const {
  resetGlobal,
  updateStep,
  updateInitialized,
  updateVisitorMode,
  updateRefresh,
} = globalSlice.actions;
export default globalSlice.reducer;
