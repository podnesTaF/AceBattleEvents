import { IUser, UserState } from "@lib/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  data: null,
  isAuth: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuth = true;
      state.data = action.payload;
    },
    updateUserData: ({ data }, action: PayloadAction<IUser>) => {
      if (!data) return;
      data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser, updateUserData } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.data;
export const selectIsAuth = (state: { user: UserState }) => state.user.isAuth;

export const userReducer = userSlice.reducer;
