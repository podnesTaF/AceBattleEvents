import { IEvent } from "./IEvent";

export type IPrize = {
  id: number;
  place: number;
  amount: number;
  category: string;
};

export type IPrizeCategory = {
  id: number;
  name: string;
  event: IEvent;
  prizes: IPrize[];
};
