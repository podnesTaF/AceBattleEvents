import { IEvent } from "./IEvent";

export type ITimeTable = {
  id: number;
  startTime: string;
  description: string;
  validUntil: string;

  active: boolean;

  eventId: number;
  event: IEvent;

  rows: ITimeTableRow[];
};

export type ITimeTableRow = {
  id: number;
  callRoomTime?: string;
  startTime: string;
  category?: string;
  teamMembers?: string;
  event: string;
  timeTableId: number;
  timeTable?: ITimeTable;
};

export type TimetableByDay = {
  date: string;
  rows: ITimeTableRow[];
};
