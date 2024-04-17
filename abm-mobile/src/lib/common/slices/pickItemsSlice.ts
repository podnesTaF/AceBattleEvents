import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PickItem } from "../types";

export type pickItemsState = {
  items: {
    [key: string]: PickItem[];
  };
};

const initialState: pickItemsState = {
  items: {},
};

export const pickItemsSlice = createSlice({
  name: "pickItems",
  initialState,
  reducers: {
    setItems: (
      state,
      action: PayloadAction<{ key: string; items: PickItem[] }>
    ) => {
      state.items[action.payload.key] = action.payload.items;
    },
    clearItems: (state, action: PayloadAction<string>) => {
      state.items[action.payload] = [];
    },
    clearAllItems: (state) => {
      state.items = {};
    },
  },
});

export const { setItems, clearItems, clearAllItems } = pickItemsSlice.actions;
export const selectItems = (state: { pickItems: pickItemsState }) =>
  state.pickItems.items;

export const pickItemsReducer = pickItemsSlice.reducer;
