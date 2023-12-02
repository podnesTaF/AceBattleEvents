import Container from "@Components/common/Container";
import CustomSelect from "@Components/custom/CustomSelect";
import UserCard from "@Components/user/UserCard";
import { Box, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { participantsFilters } from "@lib/common/utils/filters";
import { ITeam, RunnerPreview } from "@lib/models";
import { useGetRunnersEventParitipantsQuery } from "@lib/services";
import { getRunnerGroupedData, transformGroupedData } from "@lib/utils";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

const RunnerParticipants = ({ eventId }: { eventId?: string }) => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [groupedData, setGroupedData] = useState<any>({});
  const [teams, setTeams] = useState<{ [key: string]: ITeam }>({});

  const [teamsFilter, setTeamsFilter] = useState<number>();

  const { data: runnerPreviews, isLoading } =
    useGetRunnersEventParitipantsQuery({
      eventId,
      gender: category,
      teamId: teamsFilter,
    });

  useEffect(() => {
    if (runnerPreviews) {
      setGroupedData(getRunnerGroupedData(runnerPreviews));
      if (!teamsFilter) {
        const teams = runnerPreviews.reduce((acc, runner) => {
          runner.teamsAsRunner?.forEach((team: ITeam) => {
            acc[team.id] = team;
          });
          return acc;
        }, {} as { [key: string]: ITeam });

        setTeams(teams);
      }
    }
  }, [runnerPreviews]);

  const renderGroup = ({ item }: { item: any }) => (
    <VStack key={item.letter}>
      <Heading px={"$6"} py={"$2"} color={"$coolGray400"}>
        {item.letter}
      </Heading>
      <Container>
        {item.data.map((preview: RunnerPreview) => (
          <UserCard
            key={preview.id}
            user={preview.user}
            runnerPreview={preview}
          />
        ))}
      </Container>
    </VStack>
  );

  return (
    <Box flex={1}>
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
        <Box
          w={"$1/2"}
          rounded={"$lg"}
          borderColor="$coolGray400"
          borderWidth={1}
        >
          <HStack px={"$3"} py={"$1"} space="lg" alignItems="center">
            <Heading color="$coolGray400" size={"sm"}>
              Team
            </Heading>
            <Box flex={1}>
              <CustomSelect
                onChange={(value) =>
                  setTeamsFilter(!isNaN(+value) ? +value : undefined)
                }
                items={participantsFilters(Object.values(teams)).teams}
                defaultPlaceholder="All"
              />
            </Box>
          </HStack>
        </Box>
      </HStack>
      <Box pb={"$4"}>
        <FlatList
          data={transformGroupedData(groupedData)}
          renderItem={renderGroup}
          keyExtractor={(item) => item.letter}
        />
      </Box>
    </Box>
  );
};

export default RunnerParticipants;
