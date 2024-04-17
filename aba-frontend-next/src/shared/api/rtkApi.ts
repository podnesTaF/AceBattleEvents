import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: baseURL });

export const api = createApi({
  baseQuery,
  tagTypes: ["Country", "Athletes", "TeamPreviews", "Genders"],
  endpoints: () => ({}),
});
