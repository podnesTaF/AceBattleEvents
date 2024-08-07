import React from "react";
import { IRaceRunner } from "~/lib/races/types/runnerResults";
import {
  getCategoryByDoB,
  getCountryFlagSrc,
  getMeters,
  getPace,
  msToMinutesAndSeconds,
} from "~/lib/utils";

interface Props {
  raceRunners: IRaceRunner[];
}

const JokerResultDetails: React.FC<Props> = ({ raceRunners }) => {
  return (
    <div className="w-full">
      {raceRunners
        .sort((a, b) => a.splits[0].resultInMs - b.splits[0].resultInMs)
        .map((runnerResult: IRaceRunner, i: number) => {
          const isJoker = runnerResult.runnerRole.name.includes("joker");
          return (
            <div
              key={runnerResult.id}
              className={`w-full ${
                isJoker
                  ? "bg-red-500 text-white"
                  : "border-gray-300  border-[1px]"
              } px-4 md:px-8 py-4 flex gap-6 flex-col sm:flex-row flex-nowrap`}
            >
              <div className="flex flex-col gap-5 w-full sm:w-1/3 lg:w-1/4">
                <h4
                  className={`${
                    isJoker ? "text-white" : "text-gray-400"
                  } font-semibold sm:texl-lg text-xl`}
                >
                  {runnerResult.runner.firstName} {runnerResult.runner.lastName}
                </h4>
                <div className="flex justify-around gap-6">
                  <div>
                    <h5 className="text-lg font-semibold">Cat.</h5>
                    <h5 className="text-lg">
                      {getCategoryByDoB(runnerResult.runner.dateOfBirth)}
                    </h5>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold">Nat.</h5>
                    <img
                      src={getCountryFlagSrc(
                        runnerResult.runner.country.shortName
                      )}
                      alt="flag"
                      width={40}
                      height={30}
                    />
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold">Pace</h5>
                    <h5 className="text-lg">
                      {getPace(
                        runnerResult.splits[runnerResult.splits.length - 1]
                          .resultInMs,
                        runnerResult.splits[runnerResult.splits.length - 1]
                          .distanceInCm,
                        runnerResult.splits[0]
                      )}{" "}
                      / km
                    </h5>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-2/3 ">
                {i === 0 && (
                  <h5 className="text-xl font-semibold uppercase mb-4 text-center">
                    splits
                  </h5>
                )}
                <div className="flex flex-wrap gap-6 lg:max-h-[300px] justify-center items-center">
                  {runnerResult.splits.map((split, i) => (
                    <p className="w-1/3 sm:w-1/4 md:w-1/5" key={split.id}>
                      {getMeters(split.distanceInCm)} m:{" "}
                      {msToMinutesAndSeconds(split.resultInMs)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default JokerResultDetails;
