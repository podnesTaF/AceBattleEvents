import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import CustomSelect from "@Components/custom/CustomSelect";
import TeamDescription from "@Components/teams/TeamDescription";
import TeamPreviewCard from "@Components/teams/TeamPreviewCard";
import { Box, HStack, Heading } from "@gluestack-ui/themed";
import { participantsFilters } from "@lib/common/utils/filters";
import { ITeam } from "@lib/models";
import { useGetTeamsByEventQuery } from "@lib/services";
import React, { useState } from "react";
import { FlatList } from "react-native";

const TeamsParticipants = ({ eventId }: { eventId?: string }) => {
  const [category, setCategory] = useState<string | undefined>(undefined);

  const { data: teams, isLoading: isTeamsLoading } = useGetTeamsByEventQuery({
    eventId: eventId,
    category,
  });

  return (
    <>
      <HStack p={"$4"} alignItems="center" justifyContent="center" space="md">
        <Box
          w={"$1/2"}
          rounded={"$lg"}
          borderColor="$coolGray400"
          borderWidth={1}
        >
          <HStack px={"$3"} py={"$1"} space="lg" alignItems="center">
            <Heading color="$coolGray400" size={"sm"}>
              Category
            </Heading>
            <Box flex={1}>
              <CustomSelect
                onChange={(value) => setCategory(value)}
                items={participantsFilters().category}
              />
            </Box>
          </HStack>
        </Box>
      </HStack>
      <SkeletonLoader<ITeam[]> data={teams}>
        {(data) => (
          <FlatList<ITeam>
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Box h={"$4"} />}
            ListFooterComponent={() => <Box h={"$24"} />}
            renderItem={({ item }) => (
              <TeamPreviewCard
                Item={TeamDescription}
                team={item}
                imageProportion={1}
              />
            )}
          />
        )}
      </SkeletonLoader>
    </>
  );
};

export default TeamsParticipants;
