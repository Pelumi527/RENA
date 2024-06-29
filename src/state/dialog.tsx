import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dialogStates {
  bSidebar: number;
  bWalletHold: boolean;
  bWalletPanel: boolean;
  bItemModal: any;
  bClaimModal: any;
  openStakingModal: boolean;
  isSigningTransaction: boolean;
  isTransactionSuccess: boolean;
}

const initialState: dialogStates = {
  bSidebar: 0,
  bWalletPanel: false,
  bWalletHold: false,
  bClaimModal: false,
  bItemModal: [],
  openStakingModal: false,
  isSigningTransaction: false,
  isTransactionSuccess: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<number>) => {
      state.bSidebar = action.payload;
    },
    toggleWalletPanel: (state, action: PayloadAction<boolean>) => {
      state.bWalletPanel = action.payload;
    },
    toggleConnectRequest: (state, action: PayloadAction<boolean>) => {
      state.bWalletHold = action.payload;
    },
    toggleItemModal: (state, action: PayloadAction<any[]>) => {
      state.bItemModal = action.payload;
    },
    toggleClaimModal: (state, action: PayloadAction<any>) => {
      state.bClaimModal = action.payload;
    },
    toggleStakingModal: (state, action: PayloadAction<boolean>) => {
      state.openStakingModal = action.payload;
    },
    updateIsSigningTransaction: (state, action: PayloadAction<boolean>) => {
      state.isSigningTransaction = action.payload;
    },
    updateIsTransactionSuccess: (state, action: PayloadAction<boolean>) => {
      state.isTransactionSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  toggleSidebar,
  toggleWalletPanel,
  toggleConnectRequest,
  toggleItemModal,
  toggleClaimModal,
  toggleStakingModal,
  updateIsSigningTransaction,
  updateIsTransactionSuccess
} = dialogSlice.actions;

export default dialogSlice.reducer;
