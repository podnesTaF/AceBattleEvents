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
    addPlayer: builder.mutation<IPlayer, IPlayer>({
      query: (body) => ({
        url: "/players",
        method: "POST",
        body,
      }),
    }),
    updatePlayer: builder.mutation<IPlayer, IPlayer>({
      query: (body) => ({
        url: "/players",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllPlayersQuery,
  useAddPlayerMutation,
  useUpdatePlayerMutation,
} = playerApi;
