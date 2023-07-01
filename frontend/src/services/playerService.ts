import { IPlayer } from "@/models/ITeam";
import { api } from "./api";

export const playerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlayers: builder.query<
      { players: IPlayer[]; totalPages: number },
      { params: string; page: number }
    >({
      query: ({ params, page }) => `/players?${params}&page=${page}`,
      providesTags: (result) => [{ type: "Player", id: "LIST" }],
    }),
  }),
});

export const { useGetAllPlayersQuery } = playerApi;
