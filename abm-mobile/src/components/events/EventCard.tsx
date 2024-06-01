import AbmButton from "@Components/common/buttons/AbmButton";
import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { IEvent } from "@lib/models";
import { convertFlagIntoPng, formatDate } from "@lib/utils";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  event: IEvent;
  passed?: boolean;
  children?: React.ReactNode;
  isLast?: boolean;
}

const EventCard: React.FC<Props> = ({ event, children, passed, isLast }) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Box
      p={"$3"}
      backgroundColor="$white"
      borderBottomColor="$coolGray300"
      borderBottomWidth={isLast ? 0 : 2}
    >
      <Heading textAlign="center" size={"lg"} mb={"$4"}>
        {event.title}
      </Heading>
      <VStack space="md" width={"$full"}>
        <HStack justifyContent="space-between" space="md">
          <Text size={"md"}>{t("common.date")}</Text>
          <Heading size={"md"}>
            {formatDate(event.startDateTime, false)}
          </Heading>
        </HStack>
        <HStack justifyContent="space-between" space="md">
          <Text size={"md"}>{t("common.location")}</Text>
          <HStack alignItems="center" space="sm">
            {event.location.country?.flagIconUrl && (
              <Image
                role={"img"}
                alt={"flag"}
                source={{
                  uri: convertFlagIntoPng(event.location.country.flagIconUrl),
                }}
                size={"xs"}
                maxHeight={"$7"}
              />
            )}
            <Heading size={"md"}>
              {event.location.city}, {event.location.country.name}
            </Heading>
          </HStack>
        </HStack>
        {children}
        <HStack justifyContent="center">
          {passed ? (
            <AbmButton
              onPress={() =>
                router.push({
                  pathname: "/(modals)/(event)/results",
                  params: { eventId: event.id + "" },
                })
              }
              title={t("common.results")}
            />
          ) : (
            <Box my={"$2"}>
              <AbmButton
                onPress={() => router.push(`/(modals)/(event)/${event.id}`)}
                title={t("common.eventPage")}
              />
            </Box>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default EventCard;
