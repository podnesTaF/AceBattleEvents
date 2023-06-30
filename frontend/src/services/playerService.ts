import { IPlayer } from "@/models/ITeam";
import { api } from "./api";

export const playerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlayers: builder.query<IPlayer[], void>({
      query: () => `/players`,
      providesTags: (result) => [{ type: "Player", id: "LIST" }],
    }),
  }),
});

export const { useGetAllPlayersQuery } = playerApi;
