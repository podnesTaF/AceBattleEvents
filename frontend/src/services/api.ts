import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const BASE_URL = "http://localhost:4000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session?.user) {
      headers.set("Authorization", `Bearer ${session.user.token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  tagTypes: ["Event", "Transaction", "Registration", "Image", "Player"],
  endpoints: () => ({}),
});
