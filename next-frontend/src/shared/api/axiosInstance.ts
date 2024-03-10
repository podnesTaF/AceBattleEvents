import axios from "axios";
import { Session } from "next-auth";
import { baseURL } from "../constants";

export const createApiInstance = (session?: Session | null) => {
  const bearerToken = session?.user?.token;
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }

  return axios.create({
    baseURL,
    headers,
  });
};
