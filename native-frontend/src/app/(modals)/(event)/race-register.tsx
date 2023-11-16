import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import FormButton from "@Components/common/forms/FormButton";
import PickField from "@Components/common/forms/PickField";
import { runners } from "@Constants/dummy-data";
import { Box, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import {
  clearAllValues,
  selectItems,
  selectValues,
  setItems,
} from "@lib/store";
import {
  cutString,
  mapRunnersToPickItems,
  registerForRaceSchema,
} from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RaceRegister = () => {
  const { eventId, raceId } = useLocalSearchParams();
  const { newValues } = useAppSelector(selectValues);
  const { availablePlayers } = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  // check if team can take part in the race

  useEffect(() => {
    dispatch(clearAllValues());
    dispatch(
      setItems({
        key: "availablePlayers",
        items: mapRunnersToPickItems(runners),
      })
    );
  }, [eventId, raceId]);

  useEffect(() => {
    form.setValue("players", newValues.players);
  }, [newValues.players]);

  const form = useForm<{ players: string[] }>({
    mode: "onChange",
    resolver: yupResolver(registerForRaceSchema),
  });

  const registerTeam = (data: { players: string[] }) => {
    console.log(data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <HeaderSubtitledTitle
              tintColor={tintColor}
              title={"Register team for a race"}
            />
          ),
        }}
      />
      <Box m={"$4"}>
        <Container vertical>
          <Box py={"$4"}>
            <FormProvider {...form}>
              <VStack space="xs">
                <PickField
                  name="players"
                  label="Choose Runners"
                  placeholder={
                    newValues.players?.length
                      ? cutString(
                          `${newValues.players.length} players selected`,
                          20
                        )
                      : "Choose 7 members of the team"
                  }
                  multiple={true}
                />
              </VStack>
              <FormButton
                onPress={form.handleSubmit(registerTeam)}
                title={"Submit Registration"}
                isLoading={
                  form.formState.isLoading || form.formState.isSubmitting
                }
                disabled={form.formState.isSubmitting}
              />
            </FormProvider>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RaceRegister;
