import RunnerResultItem from "@Components/race/RunnerResultItem";
import { msToMinutesAndSeconds } from "@lib/common/utils";
import { IRunnerResult } from "@lib/models";
import { useTranslation } from "react-i18next";

export const getRunnerResultsRows = (
  runnerResults: IRunnerResult[]
): {
  [key: string]:
    | string
    | {
        type: string;
        color: string;
        text: string;
        link: any;
      }
    | JSX.Element;
}[] => {
  const { t } = useTranslation();
  return runnerResults.map((runnerResult) => ({
    expand: <RunnerResultItem runnerResult={runnerResult} />,
    [t("common.result")]:
      msToMinutesAndSeconds(runnerResult.finalResultInMs) || "out",
    [t("common.runner")]: {
      link: "/(modals)/(profile)/" + runnerResult.runner.user.id,
      type: "link",
      color: "$coolGray400",
      text:
        runnerResult.runner.user.name + " " + runnerResult.runner.user.surname,
    },
  }));
};
