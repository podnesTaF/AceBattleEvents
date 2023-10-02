import axios from "axios";
import {
  AdminApi,
  AthletesApi,
  ClubApi,
  EventsApi,
  MediaApi,
  MemberApi,
  NewsApi,
  RacesApi,
  TeamsApi,
  UserApi,
} from "./endpoints";

interface ApiReturnType {
  events: ReturnType<typeof EventsApi>;
  clubs: ReturnType<typeof ClubApi>;
  teams: ReturnType<typeof TeamsApi>;
  users: ReturnType<typeof UserApi>;
  media: ReturnType<typeof MediaApi>;
  athletes: ReturnType<typeof AthletesApi>;
  news: ReturnType<typeof NewsApi>;
  races: ReturnType<typeof RacesApi>;
  admin: ReturnType<typeof AdminApi>;
  member: ReturnType<typeof MemberApi>;
}

// https://abe-server.up.railway.app/api/v1

export const Api = (token?: string): ApiReturnType => {
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
    media: MediaApi(instance),
    athletes: AthletesApi(instance),
    news: NewsApi(instance),
    races: RacesApi(instance),
    admin: AdminApi(instance),
    member: MemberApi(instance),
  };
};
