import WithLoading from "@Components/HOCs/withLoading";
import InfoTemplate from "@Components/common/InfoTemplate";
import ListStyledWrapper from "@Components/common/wrappers/ListStyledWrapper";
import { VStack } from "@gluestack-ui/themed";
import { useFetchSpectatorRegistrationsQuery } from "@lib/services";
import React from "react";
import { useTranslation } from "react-i18next";
import SpectatorRegistrationCard from "../SpectatorRegistrationCard";

const SpectatorCalendar = (): JSX.Element => {
  const { t } = useTranslation();

  const { data: registrations, isLoading } =
    useFetchSpectatorRegistrationsQuery();

  return (
    <ListStyledWrapper
      title={t("calendar.yourEventsRegistrations")}
      primaryBgColor={"#1e1c1f"}
    >
      <WithLoading isLoading={!registrations || isLoading}>
        {registrations?.length ? (
          registrations.map((reg) => (
            <SpectatorRegistrationCard key={reg.id} registration={reg} />
          ))
        ) : (
          <VStack space="md">
            <InfoTemplate
              title={t("calendar.noRegistrationsFound")}
              text={t("calendar.noRegistrationsYet")}
            />
          </VStack>
        )}
      </WithLoading>
    </ListStyledWrapper>
  );
};

export default SpectatorCalendar;
