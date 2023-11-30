import { IManager } from "./IManager";
import { IUser } from "./IUser";

export type ICoach = {
  id: number;
  user: IUser;
  manager?: IManager;
};
