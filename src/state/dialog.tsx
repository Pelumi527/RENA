import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dialogStates {
  bSidebar: boolean;
  bWalletHold: boolean;
  bWalletPanel: boolean;
  bItemModal: any;
  bClaimModal: any;
}

const initialState: dialogStates = {
  bSidebar: false,
  bWalletPanel: false,
  bWalletHold: false,
  bClaimModal: false,
  bItemModal: undefined
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload)
      state.bSidebar = action.payload;
    },
    toggleWalletPanel: (state, action: PayloadAction<boolean>) => {
      state.bWalletPanel = action.payload;
    },
    toggleConnectRequest: (state, action: PayloadAction<boolean>) => {
      state.bWalletHold = action.payload;
    },
    toggleItemModal: (state, action: PayloadAction<any>) => {
      state.bItemModal = action.payload;
    },
    toggleClaimModal: (state, action: PayloadAction<any>) => {
      state.bClaimModal = action.payload;
    }
  },
  extraReducers: (builder) => { },
});

export const {
  toggleSidebar,
  toggleWalletPanel,
  toggleConnectRequest,
  toggleItemModal,
  toggleClaimModal
} = dialogSlice.actions;
export default dialogSlice.reducer;
