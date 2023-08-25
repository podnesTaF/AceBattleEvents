import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { ResultTableRow } from "~/lib/types";
import ExpandableRow from "./ExpandableRow";

interface ExpandableTableProps {
  headers: string[];
  rows: ResultTableRow[];
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "ff0000",
    color: theme.palette.common.white,
    fontSize: "1.25rem",
    fontWeight: "semibold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
  },
}));

const ExpandableTable: React.FC<ExpandableTableProps> = ({ headers, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className="bg-red-500">
          <TableRow className="text-white font-semibold text-xl">
            <StyledTableCell align="center">Team</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Result</StyledTableCell>
            <StyledTableCell align="center">Race</StyledTableCell>
            <StyledTableCell align="center">Event Page</StyledTableCell>
            <StyledTableCell />
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <ExpandableRow key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpandableTable;
