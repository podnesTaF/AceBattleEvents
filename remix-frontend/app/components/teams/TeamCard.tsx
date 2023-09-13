import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "@remix-run/react";
import React from "react";
import { ITeam } from "~/lib/types";
import { msToMinutesAndSeconds, transfromIntoPlayersTable } from "~/lib/utils";
import { CustomTable, TableSkeleton } from "../shared";

interface TeamCardProps {
  team?: ITeam;
  hightlightId?: number;
  editable?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({
  team,
  hightlightId,
  editable,
}) => {
  return (
    <div className="relative shadow-md rounded-md flex flex-col md:flex-row w-full md:justify-between  bg-[url('/stadium.png')] my-5 bg-no-repeat bg-cover bg-bottom">
      <div className="w-full md:w-1/2 lg:w-1/3 rounded-t-md md:rounded-t-none rounded-tl-md overflow-hidden pb-3 mb-3 md:mb-0">
        <div className="w-full bg-black p-3 md:p-4 mb-3 rounded-tl-md">
          {team ? (
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              {team.name}
            </h3>
          ) : (
            <Skeleton variant="text" width={100} />
          )}
        </div>
        <div className="p-3 w-full">
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Coach</h5>
            {team ? (
              <h5 className="text-lg">
                {team.coach.name} {team.coach.surname}
              </h5>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Rank</h5>
            <h5 className="text-lg">{team?.rank}</h5>
          </div>
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Personal Best </h5>
            <h5 className="text-lg">
              {msToMinutesAndSeconds(team?.personalBest?.resultInMs) ||
                "The Team Has No PB"}
            </h5>
          </div>
          <div className="flex justify-between w-full mb-4">
            <h5 className="text-lg font-semibold">Number of Players</h5>
            {team ? (
              <h5 className="text-lg">{team.players.length}</h5>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
        </div>
      </div>
      <div className="h-[1px] md:hidden w-full bg-black" />
      <div className="w-full md:w-1/2 lg:w-3/5 p-3">
        <h3 className="text-2xl md:text-3xl font-semibold">Players</h3>
        {team ? (
          <CustomTable
            itemsName="players"
            hightlightIdx={team.players.findIndex((p) => p.id === hightlightId)}
            rows={transfromIntoPlayersTable(team.players)}
            isLoading={false}
          />
        ) : (
          <TableSkeleton />
        )}
      </div>
      {editable && (
        <Link
          className="absolute top-4 right-4 h-10"
          to={"/user/settings/teams/" + team?.id}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      )}
    </div>
  );
};

export default TeamCard;
