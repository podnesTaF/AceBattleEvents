import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "../models";

const intialState: NotificationState = {
  unreadCount: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: intialState,
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount++;
    },
    decrementUnreadCount: (state) => {
      state.unreadCount--;
    },
  },
});

export const { setUnreadCount, incrementUnreadCount, decrementUnreadCount } =
  notificationSlice.actions;
export const selectUnreadCount = (state: { notification: NotificationState }) =>
  state.notification.unreadCount;

export const notificationReducer = notificationSlice.reducer;
