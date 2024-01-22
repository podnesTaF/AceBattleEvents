import { msToMinutesAndSeconds } from "@lib/common/utils/result-converters";
import { UserResult } from "@lib/models";
import { useTranslation } from "react-i18next";

export const getRunnerResulsTableData = (results?: UserResult[]) => {
  const { t } = useTranslation();
  if (!results) return [];
  return results.map((result) => ({
    [t("common.distance")]: `${(result.runnerResult_distance / 100).toFixed(
      0
    )} m`,
    [t("common.time")]: `${msToMinutesAndSeconds(
      result.runnerResult_finalResultInMs
    )}`,
    [t("common.details").split(" ").pop() || "Details"]: {
      type: "button",
      color: "$red500",
      text: t("race.viewRace"),
      link: "/(modals)/(race)/" + result.race_id,
    },
  }));
};
