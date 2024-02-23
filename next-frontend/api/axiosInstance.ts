import { UserApi } from "@/app/(user)/_lib/api/user";
import axios from "axios";
import { Session } from "next-auth";

interface ApiReturnType {
  users: ReturnType<typeof UserApi>;
}

export const baseURL = "http://localhost:4000/api/v2";
const isServer = typeof window === "undefined";

export const Api = (session?: Session | null): ApiReturnType => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.token}`,
  };

  const instance = axios.create({
    baseURL,
    headers,
  });

  return {
    users: UserApi(instance),
  };
};
