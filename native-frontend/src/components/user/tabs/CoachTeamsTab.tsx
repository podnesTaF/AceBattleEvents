import TeamPreview from "@Components/teams/TeamPreview";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { Box, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { IUser } from "@lib/models";
import { scaleSize } from "@lib/utils";
import React from "react";
import { ScrollView } from "react-native";

const CoachTeamsTab = ({ user }: { user: IUser }): JSX.Element => {
  return (
    <ScrollView>
      <VStack my={"$4"} space={"md"}>
        <HStack mx={"$4"}>
          <Heading size="lg">Coach's </Heading>
          <Heading size="lg">Teams</Heading>
        </HStack>
        <Box alignItems="center" overflow="hidden">
          {user.coach?.teams &&
            user.coach?.teams.map((team) => (
              <Box
                key={team.id}
                overflow="hidden"
                maxWidth={scaleSize(350)}
                mb={"$4"}
                maxHeight={"$64"}
              >
                <TeamPreviewCard
                  team={team}
                  Item={TeamPreview}
                  imageProportion={3}
                  showLink={true}
                />
              </Box>
            ))}
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default CoachTeamsTab;
