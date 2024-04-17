import { getCountryFlagSrc } from "@/src/shared/lib";
import { CustomTable } from "@/src/shared/ui/custom-table";
import Image from "next/image";
import { ITeam } from "..";

interface TeamCardProps {
  team: ITeam;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="relative shadow-md flex flex-col md:flex-row w-full md:justify-between  bg-[url('/stadium.png')] my-5 bg-no-repeat bg-cover bg-bottom">
      <div className="w-full md:w-1/2 lg:w-1/3 overflow-hidden pb-3 md:mb-0">
        <div className="w-full bg-red-600 clip-title-team p-3 md:p-4">
          <div className="flex gap-2 items-center">
            {team.country.shortName && (
              <Image
                src={getCountryFlagSrc(team.country.shortName)}
                alt="flag"
                width={40}
                height={35}
                className="max-h-7"
              />
            )}
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              {team.name}
            </h3>
          </div>
        </div>
        <div className="p-3 w-full">
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Location
            </h5>
            <h5 className="text-lg md:text-xl font-semibold">
              {team.city} {team.country.name}
            </h5>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Coach
            </h5>
            <h5 className="text-lg md:text-xl font-semibold">
              {team.coach.firstName} {team.coach.lastName}
            </h5>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Rank
            </h5>
            <h5 className="text-lg md:text-xl font-semibold">{team.rank}</h5>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Personal Best
            </h5>

            <h5 className="text-lg md:text-xl font-semibold">
              The Team Has No PB
            </h5>
          </div>
          <div>
            <h5 className="font-semibold mb-2 sm:text-lg md:text-xl text-gray-400">
              Number of Players
            </h5>
            <h5 className="text-lg md:text-xl font-semibold">
              {team.teamRunners.length}
            </h5>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-3/5 p-3">
        <h3 className="text-xl md:text-2xl font-semibold">Players</h3>
        <CustomTable
          itemsName="players"
          rows={team.teamRunners.map((p) => ({
            name: p.runner.firstName + " " + p.runner.lastName,
            DoB: p.runner.dateOfBirth,
          }))}
          isLoading={false}
        />
      </div>
    </div>
  );
};
