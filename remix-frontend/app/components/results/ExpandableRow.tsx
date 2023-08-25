import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Api } from "~/api/axiosInstance";
import { ResultTableRow } from "~/lib/types";
import {
  getResultIsMs,
  msToMinutesAndSeconds,
  transformDataToSelect,
} from "~/lib/utils";
import { CustomSelect } from "../shared";
import { StyledTableCell } from "./ExpandableTable";

interface Row {
  row: ResultTableRow;
}

const ExpandableRow: React.FC<Row> = ({ row }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teamId, setTeamId] = useState(row.team.id);

  const [isListLoading, setIsListLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [newResult, setNewResult] = useState(
    msToMinutesAndSeconds(row.resultInMs)
  );

  const updateTeamResult = async ({
    teamId,
    newResult,
  }: {
    teamId?: number;
    newResult?: string;
  }) => {
    if (!teamId || !newResult) return;

    const newResultInMs = getResultIsMs(newResult);

    setIsUpdating(true);

    const newTeamResult = await Api().teams.updateTeamResult(row.id, {
      teamId,
      oldTeamId: row.team.id,
      resultInMs: newResultInMs,
    });

    if (newTeamResult) {
      navigate(window.location.pathname);
    }

    setIsUpdating(false);
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    (async () => {
      if (isEditing) {
        setIsListLoading(true);
        const teams = await Api().teams.getTeamsSnippetsByEventId(row.event.id);

        if (teams) {
          setTeamList(teams);
          setIsListLoading(false);
        } else {
          console.log("error fetching teams");
        }
      }
    })();
  }, [isEditing]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell component="th" scope="row">
          {isEditing ? (
            isListLoading ? (
              <p>loading</p>
            ) : (
              <CustomSelect
                selected={teamId}
                placeholder={"choose team"}
                values={Object.entries(transformDataToSelect(teamList))}
                onChangeFilter={(value) => {
                  setTeamId(+value);
                }}
              />
            )
          ) : (
            <Link to={row.team.link}>{row.team.name}</Link>
          )}
        </StyledTableCell>
        <StyledTableCell align="center">{row.date}</StyledTableCell>
        {isEditing ? (
          <StyledTableCell align="center">
            <InputMask
              className="w-full border-[1px] border-gray-300 rounded-md p-2 focus:border-blue-300"
              mask={"99:99.99"}
              value={newResult}
              onChange={(e) => setNewResult(e.target.value)}
            />
          </StyledTableCell>
        ) : (
          <StyledTableCell align="center">{newResult}</StyledTableCell>
        )}
        <StyledTableCell align="center">{row.race}</StyledTableCell>
        <StyledTableCell align="center">
          <Link to={row.event.link}>{row.event.name}</Link>
        </StyledTableCell>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>
          {isUpdating ? (
            <CircularProgress size={"small"} />
          ) : isEditing ? (
            <IconButton
              onClick={updateTeamResult.bind(null, { teamId, newResult })}
            >
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Runner results
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Runner</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Cat.</TableCell>
                    <TableCell align="center">Distance</TableCell>
                    <TableCell align="center">Personal Result</TableCell>
                    <TableCell align="center">Records</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.runnerResults.map((runnerResult, i) => (
                    <TableRow key={i}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {runnerResult.runner}
                      </StyledTableCell>
                      <StyledTableCell>{runnerResult.gender}</StyledTableCell>
                      <StyledTableCell align="center">
                        {runnerResult.category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {runnerResult.distance / 100} m
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {msToMinutesAndSeconds(runnerResult.finalResultInMs)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {runnerResult.records}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ExpandableRow;
