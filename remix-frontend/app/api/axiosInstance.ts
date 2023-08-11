import axios from "axios";
import { ClubApi, EventsApi, TeamsApi } from "./endpoints";

interface ApiReturnType {
  events: ReturnType<typeof EventsApi>;
  clubs: ReturnType<typeof ClubApi>;
  teams: ReturnType<typeof TeamsApi>;
}

// https://abe-server.up.railway.app/api/v1

export const Api = (): ApiReturnType => {
  //   const session = await getSession();
  //   const headers = session?.user
  //     ? { Authorization: "Bearer " + session.user.token }
  //     : {};
  const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    // headers,
  });

  return {
    events: EventsApi(instance),
    clubs: ClubApi(instance),
    teams: TeamsApi(instance),
  };
};
