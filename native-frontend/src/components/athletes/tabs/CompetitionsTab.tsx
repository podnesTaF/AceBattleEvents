import WithLoading from "@Components/HOCs/withLoading";
import Badge from "@Components/custom/Badge";
import EventCard from "@Components/events/EventCard";
import { Box, Center, HStack, Heading, Text } from "@gluestack-ui/themed";
import { useGetRunnerCompetitionsQuery } from "@lib/services";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { useFindRunnerRegistrationsQuery } from "teamRegistrationService";

const CompetitionsTab = ({ runnerId }: { runnerId: number }) => {
  const [year, setYear] = useState("2023");
  const { t } = useTranslation();
  const {
    data: registrations,
    error,
    isLoading,
  } = useFindRunnerRegistrationsQuery({
    runnerId,
  });

  const { data: pastCompetitions, isLoading: isLoadingPastCompetitions } =
    useGetRunnerCompetitionsQuery({
      runnerId,
      year,
      past: true,
    });

  return (
    <ScrollView>
      <Box my={"$4"} mx={"$3"}>
        <Heading size={"lg"} mb={"$4"}>
          {t("competitions.upcomingCompetitions")}
        </Heading>
        <WithLoading isLoading={isLoading || !registrations}>
          {registrations?.length ? (
            registrations.map((registration) => (
              <EventCard
                key={registration.event.id + " " + registration.team.id}
                event={registration.event}
              >
                <HStack justifyContent="space-between" space="md">
                  <Text size={"md"}>{t("common.team")}</Text>
                  <Heading size={"md"}>{registration.team.name}</Heading>
                </HStack>
              </EventCard>
            ))
          ) : (
            <Center height={"$32"}>
              <Heading size={"lg"} color={"$coolGray400"}>
                {t("competitions.noUpcomingCompetitions")}
              </Heading>
            </Center>
          )}
        </WithLoading>
      </Box>
      <Box my={"$4"} mx={"$3"}>
        <Heading size={"lg"} mb={"$2"}>
          {t("competitions.pastCompetitions")}
        </Heading>
        <HStack m={"$2"} space="md">
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
        <WithLoading isLoading={isLoadingPastCompetitions || !pastCompetitions}>
          {pastCompetitions?.length ? (
            pastCompetitions.map((registration) => (
              <EventCard
                key={registration.event.id + " " + registration.team.id}
                event={registration.event}
                passed={true}
              >
                <HStack justifyContent="space-between" space="md">
                  <Text size={"md"}>{t("common.team")}</Text>
                  <Heading size={"md"}>{registration.team.name}</Heading>
                </HStack>
              </EventCard>
            ))
          ) : (
            <Center height={"$32"}>
              <Heading size={"lg"} color={"$coolGray400"}>
                {t("competitions.noPastCompetitions")}
              </Heading>
            </Center>
          )}
        </WithLoading>
      </Box>
    </ScrollView>
  );
};

export default CompetitionsTab;
