import axios from "axios";
import { ClubApi, EventsApi, TeamsApi } from "./endpoints";
import { UserApi } from "./endpoints/user";

interface ApiReturnType {
  events: ReturnType<typeof EventsApi>;
  clubs: ReturnType<typeof ClubApi>;
  teams: ReturnType<typeof TeamsApi>;
  users: ReturnType<typeof UserApi>;
}

// https://abe-server.up.railway.app/api/v1

export const Api = (request?: Request): ApiReturnType => {
  const token = request?.headers.get("ABE-SESSION");
  const headers = token ? { Authorization: "Bearer " + token } : {};
  const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    headers,
  });

  return {
    events: EventsApi(instance),
    clubs: ClubApi(instance),
    teams: TeamsApi(instance),
    users: UserApi(instance),
  };
};
