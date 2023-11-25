import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { Box } from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import React, { useEffect, useRef } from "react";
import { Dimensions, FlatList, ScrollView } from "react-native";
import AthleteBioTab from "../tabs/AthleteBioTab";
import CompetitionsTab from "../tabs/CompetitionsTab";
import ResultsTab from "../tabs/ResultsTab";

interface AthleteScreenContentProps {
  activeTab: number;
  setActiveTab: (v: number) => void;
  user: IUser;
}

const tabsData = (user: IUser) => {
  if (!user.runner) return [];
  return [
    <ScrollView>
      <AthleteBioTab user={user} />
    </ScrollView>,
    <ScrollView>
      <Box p={"$3"}>
        {user.runner.teamsAsRunner?.map((team) => (
          <TeamPreviewCard
            key={team.id}
            team={team}
            Item={TeamDescription}
            imageProportion={1}
            showLink={true}
          />
        ))}
      </Box>
    </ScrollView>,
    <ResultsTab runner={user.runner} />,
    <CompetitionsTab runnerId={user.runner.id} />,
  ];
};

const AthleteScreenContent: React.FC<AthleteScreenContentProps> = ({
  activeTab,
  user,
  setActiveTab,
}) => {
  if (!user.runner) return null;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ animated: true, index: activeTab });
  }, [activeTab]);

  const { width } = Dimensions.get("window");
  return (
    <>
      <FlatList
        ref={flatListRef}
        data={tabsData(user)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        renderItem={({ item }) => <Box width={width}>{item}</Box>}
        keyExtractor={(item, i) => i.toString()}
        scrollEnabled={false}
      />
    </>
  );
};

export default AthleteScreenContent;
