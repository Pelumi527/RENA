import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NFTtype } from "../type/renegades";

interface dialogStates {
  renegadesData: NFTtype[];
  lastRenegadesData: NFTtype | undefined;
  renaBalance: number;
}

const initialState: dialogStates = {
  renegadesData: [],
  lastRenegadesData: undefined,
  renaBalance: 0
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateRenegadesData: (state, action: PayloadAction<NFTtype[]>) => {
      state.renegadesData = action.payload;
    },
    updateRenaBalance: (state, action: PayloadAction<number>) => {
      state.renaBalance = action.payload;
    },
    updateLastRenegadesData: (state, action: PayloadAction<NFTtype>) => {
      state.lastRenegadesData = action.payload;
    }
  },
  extraReducers: (builder) => { },
});

export const {
  updateRenegadesData,
  updateRenaBalance,
  updateLastRenegadesData
} = dialogSlice.actions;
export default dialogSlice.reducer;
