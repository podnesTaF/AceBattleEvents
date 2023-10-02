import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const rows = [
  {
    "Call Room Time": "",
    "Start Time": "16:00",
    Gender: "",
    Event: "Opening Ceremony",
  },
  {
    "Call Room Time": "16:20",
    "Start Time": "16:30",
    Gender: "Women",
    Event: "Team A - Team B",
  },
  {
    "Call Room Time": "16:40",
    "Start Time": "16:50",
    Gender: "Men",
    Event: "Team A - Team B",
  },
  {
    "Call Room Time": "17:10",
    "Start Time": "17:20",
    Gender: "Girls",
    Event: "Battle for 1st-2nd place",
  },
  {
    "Call Room Time": "17:30",
    "Start Time": "17:40",
    Gender: "Boys",
    Event: "Battle for 1st-2nd place",
  },
  {
    "Call Room Time": "",
    "Start Time": "",
    Gender: "",
    Event: "Break",
  },
  {
    "Call Room Time": "18:30",
    "Start Time": "18:40",
    Gender: "Women",
    Event: "Battle for 1st-2nd place",
  },
  {
    "Call Room Time": "18:50",
    "Start Time": "19:00",
    Gender: "Men",
    Event: "Battle for 1st-2nd place",
  },
  {
    "Call Room Time": "",
    "Start Time": "19:30",
    Gender: "",
    Event: "Award Ceremony",
  },
];

const rowClass = "text-white text-lg md:text-xl";
const rowHeaderClass = "text-white text-lg md:text-xl font-semibold";

const TimeTable = () => {
  return (
    <Table className="w-full md:max-w-[650px]" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Call Room Time
          </TableCell>
          <TableCell
            sx={{
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            align="right"
          >
            Start Time
          </TableCell>
          <TableCell
            sx={{
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            align="right"
          >
            Gender
          </TableCell>
          <TableCell
            sx={{
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            align="right"
          >
            Event
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={i}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell
              sx={{
                color: "white",
                fontSize: "1rem",
              }}
              component="th"
              scope="row"
            >
              {row["Call Room Time"]}
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontSize: "1rem",
              }}
              align="right"
            >
              {row["Start Time"]}
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontSize: "1rem",
              }}
              align="right"
            >
              {row["Gender"]}
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontSize: "1rem",
              }}
              align="right"
            >
              {row["Event"]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TimeTable;
