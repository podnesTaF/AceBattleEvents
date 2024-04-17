import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TimeTable = ({ rows }: { rows: any[] }) => {
  return (
    <Table className="w-full bg-white/5 rounded-xl px-3 xl:px-5">
      <TableHead>
        <TableRow className="border-b-2 border-b-white py-3 xl:py-5">
          {Object.keys(rows[0])?.map((title, index) => (
            <TableCell
              key={index}
              sx={{
                color: "white",
                opacity: 0.7,
                fontSize: "1rem",
                lineHeight: "2rem",
                fontWeight: "bold",
                paddingX: { xs: 2, sm: 3 },
              }}
            >
              {title[0].toUpperCase() +
                title
                  .slice(1)
                  .split(/(?=[A-Z])/)
                  .join(" ")}
            </TableCell>
          ))}
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
            {Object.keys(row).map((title, i) => (
              <TableCell
                key={i}
                sx={{
                  color: "white",
                  fontSize: "1rem",
                  lineHeight: "2rem",
                  borderBottom: "1px solid #ffffff1a",
                  paddingX: { xs: 2, sm: 3 },
                }}
                component="th"
                scope="row"
              >
                {(row as any)[title]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TimeTable;
