import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

//http://192.168.1.17:4000/api/v1
export const BASE_URL = "https://abe-server.up.railway.app/api/v1";

const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    console.log("Error retrieving token:", error);
  }
};

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await retrieveToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  { maxRetries: 5 }
);

export const api = createApi({
  baseQuery,
  tagTypes: [
    "Runners",
    "Race",
    "Auth",
    "User",
    "Event",
    "FutureEvent",
    "Team",
    "NewsPreview",
    "TeamRegistrations",
    "Notification",
    "RunnerPreview",
    "News",
    "Coach",
    "Manager",
    "Tags",
    "Registrations",
  ],
  endpoints: () => ({}),
});
