import React, { useEffect } from "react";
import { IRaceTeam } from "~/lib/races/types/teamResults";
import { msToMinutesAndSeconds } from "~/lib/utils";
import TeamResultRow from "./TeamResultRow";

interface ResultTableProps {
  raceTeam?: IRaceTeam;
  // runnerResults: IRunnerResult[];
  tranformedResults: any[];
  position: number;
}

const ResultsTable: React.FC<ResultTableProps> = ({
  raceTeam,
  position,
  tranformedResults,
}) => {
  const [result, setResult] = React.useState<string | null>(null);

  useEffect(() => {
    if (raceTeam) {
      setResult(msToMinutesAndSeconds(raceTeam.totalTimeInMs));
    }
  }, []);

  return (
    <div className="w-full">
      {raceTeam && (
        <div className="w-full flex justify-between p-4">
          <h5 className="text-xl uppercase font-semibold">
            {position}. {raceTeam.team.name}
          </h5>
          <h5 className="text-xl font-semibold">{result}</h5>
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-left border-separate text-sm sm:text-lg">
          {tranformedResults.length ? (
            <thead className="text-white uppercase bg-red-500">
              <tr>
                {Object.keys(tranformedResults[0]).map((header, i) =>
                  header !== "expand" ? (
                    <th
                      key={i}
                      className={`px-4 py-2 ${
                        header === "records"
                          ? "hidden lg:table-cell"
                          : header === "pace"
                          ? "hidden md:table-cell"
                          : ""
                      }`}
                    >
                      {header}
                    </th>
                  ) : (
                    <th key={i} className="px-4 py-2"></th>
                  )
                )}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {tranformedResults.map((row, i) => (
              <TeamResultRow key={i} row={row} i={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
