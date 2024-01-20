import { languageReducer } from "@lib/language/slices";
import { notificationReducer } from "@lib/notification/slices";
import { manageTeamReducer, registerTeamReducer } from "@lib/teams/slices";
import { userReducer } from "@lib/user/slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { formValuesReducer, pickItemsReducer } from "../slices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      manageTeam: manageTeamReducer,
      user: userReducer,
      pickItems: pickItemsReducer,
      registerTeam: registerTeamReducer,
      formValues: formValuesReducer,
      notification: notificationReducer,
      language: languageReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
