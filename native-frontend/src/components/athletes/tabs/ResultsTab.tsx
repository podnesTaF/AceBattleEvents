import WithLoading from "@Components/HOCs/withLoading";
import Badge from "@Components/custom/Badge";
import CustomTable from "@Components/custom/tables/CustomTable";
import { HStack, Heading, VStack } from "@gluestack-ui/themed";
import { IRunner, UserResult } from "@lib/models";
import { useGetRunnerResultsQuery } from "@lib/services";
import { getRunnerResulsTableData } from "@lib/utils";
import React, { useEffect, useState } from "react";

const personalBests = [
  {
    Distance: "729 m",
    Time: "1:39.23",
    Details: {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home",
    },
  },
  {
    Distance: "1609 m",
    Time: "4:09.23",
    Details: {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home",
    },
  },
];

const allResults = [
  {
    Distance: "729 m",
    Time: "1:39.23",
    Details: {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home",
    },
  },
  {
    Distance: "1609 m",
    Time: "4:09.23",
    Details: {
      type: "button",
      color: "$red500",
      text: "View Race",
      link: "/(drawer)/(tabs)/home",
    },
  },
];

type ResultsTabProps = {
  runner: IRunner;
};

const ResultsTab = ({ runner }: ResultsTabProps): JSX.Element => {
  const [year, setYear] = useState("2023");
  const { data: resultsData, isLoading } = useGetRunnerResultsQuery({
    runnerId: runner.id,
    resultYear: year,
  });
  const [pbs, setPbs] = useState<UserResult[]>([]);

  useEffect(() => {
    if (!resultsData || pbs.length) return;
    setPbs(resultsData.results.filter((result) => result.pbForRunner_id));
  }, [resultsData]);

  return (
    <VStack mt={"$4"} space="lg">
      <VStack space="md">
        <Heading mx={"$4"} size={"lg"}>
          Personal Best
        </Heading>
        <WithLoading isLoading={isLoading}>
          <CustomTable rows={getRunnerResulsTableData(pbs)} />
        </WithLoading>
      </VStack>
      <VStack space="sm" mx={"$0"}>
        <Heading mx={"$4"} size={"lg"}>
          All Results
        </Heading>
        <HStack mx={"$2"} space="md">
          {["2023", "2022"].map((resultYear, i) => (
            <Badge
              px={"$3"}
              py={"$1"}
              key={i}
              text={resultYear}
              isActive={resultYear === year}
              onPress={() => setYear(resultYear)}
            />
          ))}
        </HStack>
        <WithLoading isLoading={isLoading}>
          <CustomTable rows={getRunnerResulsTableData(resultsData?.results)} />
        </WithLoading>
      </VStack>
    </VStack>
  );
};

export default ResultsTab;
