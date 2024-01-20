import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type languageState = {
  language: string;
};

const initialState: languageState = {
  language: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectLanguage = (state: { language: languageState }) =>
  state.language.language;

export const languageReducer = languageSlice.reducer;
