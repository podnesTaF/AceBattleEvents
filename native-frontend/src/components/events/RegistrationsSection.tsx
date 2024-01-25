import InfoTemplate from "@Components/common/InfoTemplate";
import TeamRegistrationCard from "@Components/teams/TeamRegistrationCard";
import { Box, HStack, Icon, Text } from "@gluestack-ui/themed";
import { ITeamRegistration, IUser, IViewer } from "@lib/models";
import { scaleSize } from "@lib/utils";
import { InfoIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

interface RegistrationSectionProps {
  user: IUser;
  spectatorRegistrations?: IViewer[];
  teamRegistrations?: ITeamRegistration[];
}

const RegistrationsSection: React.FC<RegistrationSectionProps> = ({
  user,
  spectatorRegistrations,
  teamRegistrations,
}) => {
  const { t } = useTranslation();

  if (user.role === "manager" || user.role === "runner") {
    return (
      <>
        {teamRegistrations?.length ? (
          teamRegistrations.map((reg) => (
            <TeamRegistrationCard
              key={reg.id}
              event={reg.event}
              team={reg.team}
            />
          ))
        ) : user.role === "runner" ? (
          <HStack py={"$3"} space={"md"} alignItems="center">
            <Icon as={InfoIcon} size={"lg"} color="$primary400" />
            <Text size="lg">{t("event.notRegisteredAsRunner")}</Text>
          </HStack>
        ) : (
          <HStack
            py={"$3"}
            space={"md"}
            alignItems="center"
            width={scaleSize(250)}
          >
            <Icon as={InfoIcon} size={"lg"} color="$primary400" />
            <Text size="lg">{t("event.noTeamsRegistered")}</Text>
          </HStack>
        )}
      </>
    );
  }

  if (user.role === "spectator") {
    <>
      <Box w={"auto"} h={"$24"}>
        <InfoTemplate
          title={t("event.empty")}
          text={t("event.notRegisteredToAttend")}
        />
      </Box>
    </>;
  }

  return (
    <>
      <Box h={"$24"}>
        <InfoTemplate
          height={"auto"}
          title={t("event.empty")}
          text={t("event.notRegisteredToAttend")}
        />
      </Box>
    </>
  );
};

export default RegistrationsSection;
