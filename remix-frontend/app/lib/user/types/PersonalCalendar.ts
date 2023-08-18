import { IEvent } from "~/lib/events/types";
import { IUser } from "./IUser";

export type PersonalEvents = {
  team: {
    id: number;
    name: string;
  };
  event: IEvent;
  manager?: IUser;
};
