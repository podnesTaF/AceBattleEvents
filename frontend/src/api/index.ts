import axios from "axios";
import { getSession } from "next-auth/react";
import { EventsApi } from "./events";

interface ApiReturnType {
  events: ReturnType<typeof EventsApi>;
}

// https://abe-server.up.railway.app/api/v1

export const Api = async (): Promise<ApiReturnType> => {
  const session = await getSession();
  const headers = session?.user
    ? { Authorization: "Bearer " + session.user.token }
    : {};
  const instance = axios.create({
    baseURL: "https://abe-server.up.railway.app/api/v1",
    headers,
  });

  return {
    events: EventsApi(instance),
  };
};
