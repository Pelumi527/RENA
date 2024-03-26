import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NFTtype } from "../type/renegades";

interface dialogStates {
  isLoading: boolean;
  isBalanceLoading: boolean;
  renegadesData: NFTtype[];
  lastRenegadesData: NFTtype | undefined;
  renaBalance: number;
  isRenaLoading: boolean;
  isLRDLoading: boolean;
}

const initialState: dialogStates = {
  isLoading: false,
  isBalanceLoading: false,
  renegadesData: [],
  lastRenegadesData: undefined,
  renaBalance: 0,
  isRenaLoading: true,
  isLRDLoading: false
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateRenegadesData: (state, action: PayloadAction<NFTtype[]>) => {
      state.isLoading = true;
      state.renegadesData = action.payload;
    },
    updateRenaBalance: (state, action: PayloadAction<number>) => {
      state.isBalanceLoading = true;
      state.renaBalance = action.payload;
    },
    updateLastRenegadesData: (state, action: PayloadAction<NFTtype>) => {
      state.isLRDLoading = true;
      state.lastRenegadesData = action.payload;
    },
    updateIsRenaLoading: (state, action: PayloadAction<boolean>) => {
      state.isRenaLoading = action.payload;
    },
    updateLRDLoading: (state, action: PayloadAction<boolean>) => {
      state.isLRDLoading = action.payload;
    },
  },
  extraReducers: (builder) => { },
});

export const {
  updateRenegadesData,
  updateRenaBalance,
  updateLastRenegadesData,
  updateIsRenaLoading,
  updateLRDLoading
} = dialogSlice.actions;
export default dialogSlice.reducer;
