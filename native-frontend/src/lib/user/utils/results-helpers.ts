import { msToMinutesAndSeconds } from "@lib/common/utils/result-converters";
import { UserResult } from "@lib/models";

export const getRunnerResulsTableData = (results?: UserResult[]) => {
  if (!results) return [];
  return results.map((result) => ({
    Distance: `${(result.runnerResult_distance / 100).toFixed(0)} m`,
    Time: `${msToMinutesAndSeconds(result.runnerResult_finalResultInMs)}`,
    Details: {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(modals)/(race)/" + result.race_id,
    },
  }));
};
