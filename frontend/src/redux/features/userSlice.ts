import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "next-auth";
import { RootState } from "../store";

type UserState = {
  user: User | null;
};

const initialState = {
  user: null,
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    addBalance: (state, action: PayloadAction<number>) => {
      if (state.user) state.user.balance += +action.payload.toFixed(2);
    },
  },
});

export const { addUser, removeUser, addBalance } = user.actions;
export const selectUser = (state: RootState) => state.user.user;

export default user.reducer;
