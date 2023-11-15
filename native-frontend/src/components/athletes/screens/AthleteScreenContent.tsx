import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { teams, testUserRunner } from "@Constants/dummy-data";
import { Box } from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import React from "react";
import { ScrollView } from "react-native";
import AthleteBioTab from "../tabs/AthleteBioTab";
import CompetitionsTab from "../tabs/CompetitionsTab";
import ResultsTab from "../tabs/ResultsTab";

interface AthleteScreenContentProps {
  activeTab: number;
  user: IUser;
}

const AthleteScreenContent: React.FC<AthleteScreenContentProps> = ({
  activeTab,
  user,
}) => {
  return (
    <>
      {activeTab === 0 && (
        <ScrollView>
          <AthleteBioTab user={testUserRunner} />
        </ScrollView>
      )}
      {activeTab === 1 && (
        <ScrollView>
          <Box p={"$3"}>
            <TeamPreviewCard
              team={teams[0]}
              Item={TeamDescription}
              imageProportion={1}
              showLink={true}
            />
          </Box>
        </ScrollView>
      )}
      {activeTab === 2 && <ResultsTab />}
      {activeTab === 3 && <CompetitionsTab />}
    </>
  );
};

export default AthleteScreenContent;
