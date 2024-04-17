import { useEffect, useState } from "react";
import { IRaceRunner } from "~/lib/races/types/runnerResults";
import {
  formatDate,
  getCountryFlagSrc,
  getMeters,
  getPace,
  msToMinutesAndSeconds,
} from "~/lib/utils";

const RunnerResultDetails = ({ raceRunner }: { raceRunner: IRaceRunner }) => {
  const [formattedDOB, setFormattedDOB] = useState<string>("");
  const [pace, setPace] = useState<string | null>("");

  useEffect(() => {
    setFormattedDOB(formatDate(raceRunner.runner.dateOfBirth, false));
    setPace(
      getPace(
        raceRunner.splits[raceRunner.splits.length - 1].resultInMs,
        raceRunner.splits[raceRunner.splits.length - 1].distanceInCm,
        raceRunner.splits[0]
      )
    );
  }, []);

  return (
    <div className="w-full bg-[#F3F3F3] px-4 py-2">
      <div className="flex gap-6 flex-col sm:flex-row flex-nowrap">
        <div className="flex flex-col gap-6 w-full sm:w-1/3 lg:w-1/3">
          <div className="flex flex-col gap-4">
            <h5 className="text-lg font-semibold uppercase">nat.</h5>
            <div className="flex gap-4">
              <img
                src={getCountryFlagSrc(raceRunner.runner.country.shortName)}
                alt="flag"
                width={40}
                height={40}
              />
              <h5 className="text-lg uppercase">
                {raceRunner.runner.country.name}
              </h5>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-lg font-semibold uppercase">date of birth</h5>
            <h5 className="text-lg uppercase">{formattedDOB}</h5>
          </div>
          <div className="flex flex-col gap-4 md:hidden">
            <h5 className="text-lg font-semibold uppercase">Pace</h5>
            <h5 className="text-lg uppercase">{pace} / km</h5>
          </div>
          <div className="flex flex-col gap-4 lg:hidden">
            <h5 className="text-lg font-semibold uppercase">Records</h5>
            <h5 className="text-lg uppercase">
              {/* {raceRunner.runner?.personalBests?.find(
                (pb) => pb.distance === runnerResult.distance
              )?.id === runnerResult.id
                ? "PB"
                : ""} */}
            </h5>
          </div>
        </div>
        <div className="w-full sm:w-2/3 ">
          <h5 className="text-xl font-semibold uppercase mb-4 text-center">
            splits
          </h5>
          <div className="flex flex-wrap gap-6 lg:max-h-[300px] justify-center items-center">
            {raceRunner.splits.map((split, i) => (
              <p className="w-1/3 sm:w-1/4 md:w-1/5" key={split.id}>
                {getMeters(split.distanceInCm)} m:{" "}
                {msToMinutesAndSeconds(split.resultInMs)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunnerResultDetails;
