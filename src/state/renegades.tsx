import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../type/renegades";

interface dialogStates {
  renegadesData: ItemType[];
}

const initialState: dialogStates = {
  renegadesData: [
    {
      avatar: "/renegades/avatar-default.svg",
      name: "Renegade #211",
      rank: "42",
      level: 1
    },
    {
      avatar: "/renegades/avatar-default.svg",
      name: "Renegade #4999",
      rank: "142",
      level: 2
    },
    {
      avatar: "/renegades/avatar-default.svg",
      name: "Renegade #629",
      rank: "1442",
      level: 3
    },
    {
      avatar: "/renegades/avatar-default.svg",
      name: "Renegade #5",
      rank: "242",
      level: 3
    },
    {
      avatar: "/renegades/avatar-default.svg",
      name: "Renegade #981",
      rank: "4412",
      level: 4
    },
  ]
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateRenegadesData: (state, action: PayloadAction<ItemType[]>) => {
      state.renegadesData = action.payload;
    }
  },
  extraReducers: (builder) => { },
});

export const {
  updateRenegadesData,
} = dialogSlice.actions;
export default dialogSlice.reducer;
