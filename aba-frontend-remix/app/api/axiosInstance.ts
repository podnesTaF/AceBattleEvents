import axios from "axios";
import {
  AdminApi,
  AthletesApi,
  ClubApi,
  DictionaryApi,
  EventsApi,
  MediaApi,
  MemberApi,
  NewsApi,
  ParticipantApi,
  PaymentsApi,
  RacesApi,
  ResultsApi,
  RolesApi,
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
  roles: ReturnType<typeof RolesApi>;
  payments: ReturnType<typeof PaymentsApi>;
  dictionary: ReturnType<typeof DictionaryApi>;
  results: ReturnType<typeof ResultsApi>;
  participant: ReturnType<typeof ParticipantApi>;
}

// https://abe-server.up.railway.app/api/v2

export const Api = (token?: string): ApiReturnType => {
  const headers = token ? { Authorization: "Bearer " + token } : {};
  const instance = axios.create({
    baseURL: "https://abe-server.up.railway.app/api/v2",
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
    roles: RolesApi(instance),
    payments: PaymentsApi(instance),
    dictionary: DictionaryApi(instance),
    results: ResultsApi(instance),
    participant: ParticipantApi(instance),
  };
};
