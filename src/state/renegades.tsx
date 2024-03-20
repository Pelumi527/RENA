import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NFTtype } from "../type/renegades";

interface dialogStates {
  renegadesData: NFTtype[];
}

const initialState: dialogStates = {
  renegadesData: []
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateRenegadesData: (state, action: PayloadAction<NFTtype[]>) => {
      state.renegadesData = action.payload;
    }
  },
  extraReducers: (builder) => { },
});

export const {
  updateRenegadesData,
} = dialogSlice.actions;
export default dialogSlice.reducer;
