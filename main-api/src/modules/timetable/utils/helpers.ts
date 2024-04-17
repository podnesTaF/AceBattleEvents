import { TimetableRow } from '../entities/timetable-row.entity';
import { Timetable } from '../entities/timetable.entity';

export interface TimetableByDay {
  date: string;
  rows: TimetableRow[];
}

export const mapTimeTableByRows = (timetable: Timetable): TimetableByDay[] => {
  // Sort rows by startTime
  const sortedRows = timetable.rows.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  // Group rows by date
  const timetableByDays: TimetableByDay[] = [];

  sortedRows.forEach((row) => {
    const date = row.startTime.toISOString().split('T')[0]; // Extract date part from startTime
    const foundDay = timetableByDays.find((day) => day.date === date);

    if (foundDay) {
      foundDay.rows.push(row);
    } else {
      timetableByDays.push({
        date: date,
        rows: [row],
      });
    }
  });

  return timetableByDays;
};
