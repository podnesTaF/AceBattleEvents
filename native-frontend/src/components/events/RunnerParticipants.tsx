import Container from "@Components/common/Container";
import NoItemsAvailable from "@Components/common/NoItemsAvailable";
import SkeletonLoader from "@Components/common/states/SkeletonLoader";
import ListStyledWrapper from "@Components/common/wrappers/ListStyledWrapper";
import CustomSelect from "@Components/custom/CustomSelect";
import UserCard from "@Components/user/UserCard";
import UserCardSkeleton from "@Components/user/UserCardSkeleton";
import { Box, HStack, Heading, VStack } from "@gluestack-ui/themed";
import { participantsFilters } from "@lib/common/utils/filters";
import { ITeam, RunnerPreview } from "@lib/models";
import { useGetRunnersEventParitipantsQuery } from "@lib/services";
import { getRunnerGroupedData, transformGroupedData } from "@lib/utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

const RunnerParticipants = ({ eventId }: { eventId?: string }) => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [groupedData, setGroupedData] = useState<any>({});
  const [teams, setTeams] = useState<{ [key: string]: ITeam }>({});

  const { t } = useTranslation();

  const [teamsFilter, setTeamsFilter] = useState<number>();

  const {
    data: runnerPreviews,
    isLoading,
    error,
  } = useGetRunnersEventParitipantsQuery({
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
              {t("common.category")}
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
              {t("common.team")}
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
        <SkeletonLoader<RunnerPreview[]>
          isLoading={isLoading}
          error={error}
          data={runnerPreviews}
          loadingComponent={<UserCardSkeleton count={5} />}
        >
          {() =>
            Object.keys(groupedData).length ? (
              <FlatList
                data={transformGroupedData(groupedData)}
                renderItem={renderGroup}
                keyExtractor={(item) => item.letter}
              />
            ) : !category ? (
              <ListStyledWrapper
                title={t("event.officialRunners")}
                primaryBgColor={"#1e1c1f"}
              >
                <NoItemsAvailable
                  title={t("event.noOfficialRunnersYet")}
                  text={t("event.noRunnersInEvent")}
                />
              </ListStyledWrapper>
            ) : (
              <Heading textAlign="center" size="lg">
                {t("event.noRunnersInCategory")}
              </Heading>
            )
          }
        </SkeletonLoader>
      </Box>
    </Box>
  );
};

export default RunnerParticipants;
