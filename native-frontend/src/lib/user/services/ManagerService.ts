import { api } from "@lib/common/services/api";
import { IManager } from "../models";

export const ManagerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllManagers: build.query<IManager[], void>({
      query: () => `/managers`,
      providesTags: ["Manager"],
    }),
  }),
});

export const { useGetAllManagersQuery } = ManagerApi;
