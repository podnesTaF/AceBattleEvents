import InfoTemplate from "@Components/common/InfoTemplate";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import { EventInfo, IUser } from "@lib/models";
import { formatDate } from "@lib/utils";
import { Link } from "expo-router";
import { InfoIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

interface Props {
  user?: IUser | null;
  event: EventInfo;
}

const EventRegistrationSection: React.FC<Props> = ({ user, event }) => {
  const { t } = useTranslation();
  // fetch user status for current competition. Handle by state

  if (!event.isOpenToRegister) {
    return (
      <VStack space="lg" p={"$3"} bg={"$white"}>
        <Heading size={"lg"}>{t("calendar.registrations")}</Heading>
        <InfoTemplate
          title={t("eventRegistration.registrationsClosed")}
          text={t("eventRegistration.cantRegisterAnymore")}
        />
      </VStack>
    );
  }

  if (user?.role === "spectator") {
    return (
      <VStack space="lg" p={"$3"} bg={"$white"}>
        <Heading size={"lg"}>{t("eventRegistration.attendEvent")}</Heading>
        {event.attendanceType === "free" ? (
          <InfoTemplate
            type="success"
            title={t("eventRegistration.eventIsFree")}
            text={t("eventRegistration.comeWithoutRegistration")}
          />
        ) : (
          <>
            <HStack space="md" alignItems="center">
              <Icon as={InfoIcon} color={"$primary400"} />
              <Text>
                {event.isRegisteredToVisit
                  ? t("eventRegistration.youAreRegistered")
                  : t("eventRegistration.registrationsOpen")}
              </Text>
            </HStack>
            <Box w={"$full"} alignItems="center">
              {event.isRegisteredToVisit ? (
                <Link href={"/(drawer)/(tabs)/(account)/calendar"} asChild>
                  <Button>
                    <ButtonText>
                      {t("eventRegistration.viewInCalendar")}
                    </ButtonText>
                  </Button>
                </Link>
              ) : (
                <Link href={"/(modals)/(event)/attend-event"} asChild>
                  <Button>
                    <ButtonText>{t("eventRegistration.visitEvent")}</ButtonText>
                  </Button>
                </Link>
              )}
            </Box>
          </>
        )}
      </VStack>
    );
  }
  if (user?.role === "manager") {
    return (
      <VStack space="lg" p={"$3"} bg={"$white"}>
        <Heading size={"lg"}>{t("eventRegistration.registerYourTeam")}</Heading>
        <HStack space="md" alignItems="center">
          <Icon as={InfoIcon} color={"$primary400"} />
          <Text>{t("eventRegistration.registrationsOpen")}</Text>
        </HStack>
        {!event.allTeamsRegistered ? (
          <Link
            href={{
              pathname: "/(modals)/(event)/register-team",
              params: { eventId: event.id + "" },
            }}
            asChild
          >
            <Button>
              <ButtonText>{t("eventRegistration.registerTeams")}</ButtonText>
            </Button>
          </Link>
        ) : (
          <Heading size={"sm"} textAlign="center" color={"$coolGray400"}>
            {t("eventRegistration.allTeamsRegistered")}
          </Heading>
        )}
        {event.managerTeamRegistrations && (
          <VStack my={"$2"} space="md">
            <Heading size={"md"}>
              {t("eventRegistration.registeredTeams")}
            </Heading>
            {!event.managerTeamRegistrations.length ? (
              <Heading size={"sm"} color={"$coolGray300"}>
                {t("eventRegistration.noTeamsRegistered")}
              </Heading>
            ) : (
              event.managerTeamRegistrations.map((registration) => (
                <HStack
                  key={registration.id}
                  space="lg"
                  justifyContent="space-between"
                >
                  <Heading size="sm">{registration.team.name}</Heading>
                  <Heading size={"sm"} color={"$coolGray300"}>
                    {formatDate(registration.createdAt)}
                  </Heading>
                </HStack>
              ))
            )}
          </VStack>
        )}
      </VStack>
    );
  }
};

export default EventRegistrationSection;
