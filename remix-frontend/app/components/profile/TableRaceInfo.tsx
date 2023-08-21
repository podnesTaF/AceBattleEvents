import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import React from "react";
import { ITeamResult } from "~/lib/races/types";
import { msToMinutesAndSeconds } from "~/lib/races/utils/transform-data";
import { ITeam } from "~/lib/teams/types";
import { IUser } from "~/lib/user/types/IUser";

interface Props {
  teamResults: ITeamResult[];
  winner: ITeam;
  user: IUser;
}

const TableRaceInfo: React.FC<Props> = ({ teamResults, user, winner }) => {
  return (
    <div className="flex gap-1 flex-col w-full">
      <div className="flex gap-2 self-start">
        {winner.id === teamResults[0].team.id && <EmojiEventsIcon />}
        <h5 className="text-xl font-semibold">
          {teamResults[0].team.name} -{" "}
          {msToMinutesAndSeconds(teamResults[0].resultInMs)}
        </h5>
      </div>
      <h5 className="text-xl self-center">vs</h5>
      <div className="flex gap-2 self-end">
        {winner.id === teamResults[1].team.id && <EmojiEventsIcon />}
        <h5 className="text-xl font-semibold">
          {teamResults[1].team.name} -{" "}
          {msToMinutesAndSeconds(teamResults[1].resultInMs)}
        </h5>
      </div>
    </div>
  );
};

export default TableRaceInfo;
