import { baseURL } from "@/api/axiosInstance";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: baseURL });

export const api = createApi({
  baseQuery,
  tagTypes: ["Country"],
  endpoints: () => ({}),
});
