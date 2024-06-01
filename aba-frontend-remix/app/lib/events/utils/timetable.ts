import { formatTo24HourTime } from "~/lib/utils";
import { ITimeTableRow } from "../types";

export const transformIntoTableRows = (
  timetableRows: ITimeTableRow[]
): { [key: string]: any }[] => {
  return timetableRows.map((row) => {
    if (typeof row.teamMembers === "string") {
      return {
        callRoomTime: formatTo24HourTime(row.callRoomTime) || "",
        startTime: formatTo24HourTime(row.startTime) || "",
        category: row.category || "",
        teamMembers: row.teamMembers || "",
        event: row.event,
      };
    }

    return {
      callRoomTime: formatTo24HourTime(row.callRoomTime) || "",
      startTime: formatTo24HourTime(row.startTime) || "",
      category: row.category || "",
      event: row.event,
    };
  });
};
