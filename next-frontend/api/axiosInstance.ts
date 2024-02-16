import axios from "axios";
import { UserApi } from "./endpoints/user";

interface ApiReturnType {
  users: ReturnType<typeof UserApi>;
}

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: "http://localhost:4000/api/v2",
  });

  return {
    users: UserApi(instance),
  };
};
