import { manageTeamReducer } from "@lib/teams/slices";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      manageTeam: manageTeamReducer,
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
