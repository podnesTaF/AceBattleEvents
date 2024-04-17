import { useNavigate } from "@remix-run/react";
import { IRunner } from "~/lib/types";
import {
  formatDate,
  getCountryFlagSrc,
  getRunnerActiveTeam,
} from "~/lib/utils";

interface RunnersRankingCardProps {
  gender: string;
  runners: IRunner[];
}

export const RunnersRankingCard = ({
  gender,
  runners,
}: RunnersRankingCardProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl bg-white overflow-hidden w-full">
      <div className="bg-[#EE342C] p-2 md:p-4 lg:p-2 xl:p-4 text-white flex justify-between gap-6">
        <div className="flex flex-col justify-between gap-4">
          <h4 className="font-semibold text-lg lg:text-xl">
            {gender === "male" ? "Men's" : "Women's"} Overall
          </h4>
          <div>
            <h5 className="font-semibold text-lg">Rank</h5>
            <h3 className="text-2xl lg:text-3xl font-bold">
              {runners[0]?.rank}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-6 text-end">
          <div className="flex flex-col gap-2 md:gap-3 items-end">
            <h4 className="text-white text-lg xl:text-xl font-semibold">
              {runners[0]?.firstName} {runners[0]?.lastName}
            </h4>
            {runners[0]?.runnerTeams && runners[0]?.runnerTeams.length && (
              <p className="text-gray-100 text-sm xl:text-lg">
                {getRunnerActiveTeam(runners[0])?.team.name}
              </p>
            )}
            {runners[0]?.dateOfBirth && (
              <p className="text-gray-100 text-sm xl:text-lg">
                {formatDate(runners[0]?.dateOfBirth, false)}
              </p>
            )}
            {runners[0]?.country.name && (
              <div className="flex gap-2 items-center">
                {runners[0].country.shortName && (
                  <img
                    src={getCountryFlagSrc(runners[0].country.shortName)}
                    alt="flag"
                    width={30}
                    height={20}
                  />
                )}
                <p className="text-gray-300 text-sm xl:text-lg">
                  {runners[0]?.country?.name}
                </p>
              </div>
            )}
          </div>
          {runners[0]?.avatarUrl ? (
            <img
              src={runners[0].avatarUrl}
              width={140}
              height={140}
              alt="avatar"
              className="w-24 h-24 xl:w-36 xl:h-36 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 xl:w-36 xl:h-36 rounded-full bg-white">
              <p>
                {runners[0].firstName.charAt(0).toUpperCase() +
                  runners[0].lastName.charAt(0).toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
      {runners.length > 1 &&
        runners.slice(1).map((runner, index) => (
          <div
            onClick={() => navigate("/profile/" + runner.id)}
            className="flex flex-col min-h-[60px] gap-3 sm:flex-row justify-between sm:items-center px-4 py-1 2xl:py-2 border-b border-gray-200 hover:bg-gray-100"
            key={runner.id}
          >
            <div className="flex gap-4 items-center w-full sm:w-1/2">
              <p>{runner.rank}.</p>
              {runner.avatarUrl && (
                <img
                  src={runner.avatarUrl}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-4 rounded-full"
                />
              )}
              <h5>
                {runner.firstName} {runner.lastName}
              </h5>
            </div>
            <div className="flex gap-2 items-center">
              {runner.country.shortName && (
                <img
                  src={getCountryFlagSrc(runner.country.shortName)}
                  alt="flag"
                  width={30}
                  height={20}
                />
              )}
              <p>
                {runner.country.name},{" "}
                {getRunnerActiveTeam(runner)?.team?.name || "No Team"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
