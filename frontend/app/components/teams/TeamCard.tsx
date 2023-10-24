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
    <div className="relative shadow-md flex flex-col md:flex-row w-full md:justify-between  bg-[url('/stadium.png')] my-5 bg-no-repeat bg-cover bg-bottom">
      <div className="w-full md:w-1/2 lg:w-1/3 overflow-hidden pb-3 md:mb-0">
        <div className="w-full bg-red-600 clip-title-team p-3 md:p-4">
          {team ? (
            <div className="flex gap-2 items-center">
              {team.country.flagIconUrl && (
                <img
                  src={team.country.flagIconUrl}
                  alt="flag"
                  width={40}
                  className="max-h-7"
                />
              )}
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                {team.name}
              </h3>
            </div>
          ) : (
            <Skeleton variant="text" width={100} />
          )}
        </div>
        <div className="p-3 w-full">
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Location
            </h5>
            {team ? (
              <h5 className="text-lg md:text-xl font-semibold">
                {team.city} {team.country.name}
              </h5>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Coach
            </h5>
            {team ? (
              <h5 className="text-lg md:text-xl font-semibold">
                {team.coach.name} {team.coach.surname}
              </h5>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Rank
            </h5>
            {team ? (
              <h5 className="text-lg md:text-xl font-semibold">{team.rank}</h5>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Personal Best
            </h5>
            {team ? (
              <h5 className="text-lg md:text-xl font-semibold">
                {msToMinutesAndSeconds(team?.personalBest?.resultInMs) ||
                  "The Team Has No PB"}
              </h5>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
          <div>
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Number of Players
            </h5>
            {team ? (
              <h5 className="text-lg md:text-xl font-semibold">
                {team.players.length}
              </h5>
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </div>
        </div>
      </div>
      <div className="h-[1px] md:hidden w-full bg-black" />
      <div className="w-full md:w-1/2 lg:w-3/5 p-3">
        <h3 className="text-xl md:text-2xl font-semibold">Players</h3>
        {team ? (
          <CustomTable
            itemsName="players"
            hightlightIdx={team.players.findIndex((p) => p.id === hightlightId)}
            rows={transfromIntoPlayersTable(team.players)}
            isLoading={false}
            isTitleStraight={true}
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
