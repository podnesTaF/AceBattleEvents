import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type formValuesState = {
  defaultValues?: {
    [key: string]: any;
  };
  newValues: {
    [key: string]: any;
  };
};

const initialState: formValuesState = {
  newValues: {},
};

export const formValuesSlice = createSlice({
  name: "formValues",
  initialState,
  reducers: {
    setDefalutValues: (
      state,
      action: PayloadAction<{
        defaultValues: { [key: string]: any };
        newValues: { [key: string]: any };
      }>
    ) => {
      state.defaultValues = action.payload.defaultValues;
      state.newValues = action.payload.newValues;
    },
    setFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.newValues[action.payload.key] = action.payload.value;
    },
    clearValue: (state, action: PayloadAction<string>) => {
      state.newValues[action.payload] = {};
    },
    clearAllValues: (state) => {
      state.defaultValues = undefined;
      state.newValues = {};
    },
  },
});

export const { setDefalutValues, setFormValue, clearValue, clearAllValues } =
  formValuesSlice.actions;

export const selectValues = (state: { formValues: formValuesState }) =>
  state.formValues;

export const formValuesReducer = formValuesSlice.reducer;
