import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type formValuesState = {
  defaultValues?: {
    [key: string]: any;
  };
  newValues: {
    [key: string]: any;
  };
  valueName?: string;
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
        valueName?: string;
      }>
    ) => {
      state.defaultValues = action.payload.defaultValues;
      state.newValues = action.payload.newValues;
      state.valueName = action.payload.valueName;
    },
    setFormValue: (
      state,
      action: PayloadAction<{ key: string; value: any; valueName?: string }>
    ) => {
      state.newValues[action.payload.key] = action.payload.value;
      state.valueName = action.payload.valueName;
    },
    clearValue: (state, action: PayloadAction<string>) => {
      state.newValues[action.payload] = {};
    },
    clearAllValues: (state) => {
      state.defaultValues = undefined;
      state.newValues = {};
      state.valueName = undefined;
    },
  },
});

export const { setDefalutValues, setFormValue, clearValue, clearAllValues } =
  formValuesSlice.actions;

export const selectValues = (state: { formValues: formValuesState }) =>
  state.formValues;

export const formValuesReducer = formValuesSlice.reducer;
