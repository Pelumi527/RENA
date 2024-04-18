import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NFTtype } from "../type/renegades";

interface dialogStates {
  isLoading: boolean;
  isBalanceLoading: boolean;
  renegadesData: NFTtype[];
  renegadesRankData: NFTtype[];
  lastRenegadesData: NFTtype | undefined;
  renaBalance: number;
  isRenaLoading: boolean;
  isRenaListLoading: boolean;
  isLRDLoading: boolean;
  aptConts: number;
}

const initialState: dialogStates = {
  isLoading: false,
  isBalanceLoading: true,
  renegadesData: [],
  renegadesRankData: [],
  lastRenegadesData: undefined,
  renaBalance: 0,
  isRenaLoading: true,
  isRenaListLoading: true,
  isLRDLoading: false,
  aptConts: 0
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateRenegadesRankData: (state, action: PayloadAction<NFTtype[]>) => {
      state.renegadesRankData = action.payload;
    },
    updateRenegadesData: (state, action: PayloadAction<NFTtype[]>) => {
      state.isLoading = true;
      state.renegadesData = action.payload;
    },
    updateRenaBalance: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        state.isBalanceLoading = false;
      }
      state.renaBalance = action.payload;
    },
    updateLastRenegadesData: (state, action: PayloadAction<NFTtype>) => {
      state.isLRDLoading = false;
      state.lastRenegadesData = action.payload;
    },
    updateIsRenaLoading: (state, action: PayloadAction<boolean>) => {
      state.isRenaLoading = action.payload;
    },
    updateIsRenaListLoading: (state, action: PayloadAction<boolean>) => {
      state.isRenaListLoading = action.payload;
    },
    updateLRDLoading: (state, action: PayloadAction<boolean>) => {
      state.isLRDLoading = action.payload;
    },
    updateAptConts: (state, action: PayloadAction<number>) => {
      state.aptConts = action.payload;
    },
  },
  extraReducers: (builder) => { },
});

export const {
  updateRenegadesData,
  updateRenaBalance,
  updateLastRenegadesData,
  updateIsRenaLoading,
  updateRenegadesRankData,
  updateLRDLoading,
  updateAptConts,
  updateIsRenaListLoading
} = dialogSlice.actions;
export default dialogSlice.reducer;
