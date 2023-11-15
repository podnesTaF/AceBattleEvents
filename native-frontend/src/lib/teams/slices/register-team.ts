import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type registerTeamState = {
  newValues: {
    team?: number;
    coach?: number;
  };
};

const initialState: registerTeamState = {
  newValues: {},
};

export const registerTeamSlice = createSlice({
  name: "registerTeam",
  initialState,
  reducers: {
    resetRegisterTeam: (state) => {
      state.newValues = {};
    },
    setTeamCoach: (state, action: PayloadAction<number>) => {
      state.newValues.coach = action.payload;
    },
    setTeamForEvent: (state, action: PayloadAction<number>) => {
      state.newValues.team = action.payload;
    },
  },
});

export const { setTeamCoach, setTeamForEvent, resetRegisterTeam } =
  registerTeamSlice.actions;

export const selectRegisterTeam = (state: {
  registerTeam: registerTeamState;
}) => state.registerTeam;

export const registerTeamReducer = registerTeamSlice.reducer;
