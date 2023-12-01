import WithLoading from "@Components/HOCs/withLoading";
import InfoTemplate from "@Components/common/InfoTemplate";
import ListStyledWrapper from "@Components/common/wrappers/ListStyledWrapper";
import { VStack } from "@gluestack-ui/themed";
import { useFetchSpectatorRegistrationsQuery } from "@lib/services";
import React from "react";
import SpectatorRegistrationCard from "../SpectatorRegistrationCard";

const SpectatorCalendar = (): JSX.Element => {
  const { data: registrations, isLoading } =
    useFetchSpectatorRegistrationsQuery();

  return (
    <ListStyledWrapper
      title={"Your Events Registrations"}
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
              title="No registrations found"
              text="You don't have any registrations yet"
            />
          </VStack>
        )}
      </WithLoading>
    </ListStyledWrapper>
  );
};

export default SpectatorCalendar;
