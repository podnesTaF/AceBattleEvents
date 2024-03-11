import { AthleteApi } from "@/lib/features/athletes/services/athletes";
import axios from "axios";
import { Session } from "next-auth";

interface ApiReturnType {
  runners: ReturnType<typeof AthleteApi>;
}

export const baseURL = "http://localhost:4000/api/v2";
const isServer = typeof window === "undefined";

export const Api = (session?: Session | null): ApiReturnType => {
  const bearerToken = session?.user?.token;
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }

  const instance = axios.create({
    baseURL,
    headers,
  });

  return {
    runners: AthleteApi(instance),
  };
};
