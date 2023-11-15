import { UserState } from "@lib/models";
import { createSlice } from "@reduxjs/toolkit";

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
    removeUser: (state) => {
      state.data = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.data;
export const selectIsAuth = (state: { user: UserState }) => state.user.isAuth;

export const userReducer = userSlice.reducer;
