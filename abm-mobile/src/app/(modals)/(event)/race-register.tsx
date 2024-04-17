import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import FormButton from "@Components/common/forms/FormButton";
import PickField from "@Components/common/forms/PickField";
import { Box, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { IRunner } from "@lib/models";
import { useCheckInForRaceMutation } from "@lib/races/services/raceService";
import { useGetRunnersByTeamQuery } from "@lib/services";
import {
  clearAllItems,
  clearAllValues,
  selectItems,
  selectValues,
  setItems,
} from "@lib/store";
import {
  cutString,
  defineItemLabel,
  mapRunnersToPickItems,
  registerForRaceSchema,
} from "@lib/utils";
import { Stack, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RaceRegister = () => {
  const { newValues } = useAppSelector(selectValues);
  const { availableTeams } = useAppSelector(selectItems);
  const [pickedTeamId, setPickedTeamId] = React.useState<number | null>(null);
  const { data: teamPlayers, isLoading } =
    useGetRunnersByTeamQuery(pickedTeamId);

  const navigation = useNavigation();

  const [checkIn, { error, isLoading: isCheckInLoading }] =
    useCheckInForRaceMutation();

  const dispatch = useAppDispatch();

  // check if team can take part in the race

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        setItems({
          key: "availablePlayers",
          items: teamPlayers
            ? mapRunnersToPickItems(teamPlayers as IRunner[])
            : [],
        })
      );
    }
  }, [teamPlayers]);

  useEffect(() => {
    form.setValue("team", newValues.team);

    setPickedTeamId(() => {
      const teamId: number | undefined = availableTeams.find(
        (reg) => reg.id === newValues.team
      )?.addtionalFields?.teamId;
      if (!teamId) return null;
      return teamId;
    });
  }, [newValues.team]);

  useEffect(() => {
    form.setValue("players", newValues.players);
  }, [newValues.players]);

  const form = useForm<{ team: string; players: string[] }>({
    mode: "onChange",
    resolver: yupResolver(registerForRaceSchema),
  });

  const registerTeam = async (data: { team: string; players: string[] }) => {
    try {
      await checkIn({
        raceRegistrationId: +data.team,
        runnerIds: data.players.map((p) => +p),
      });
      dispatch(clearAllValues());
      dispatch(clearAllItems());
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
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
                  name="team"
                  label="Choose Race Registration"
                  placeholder={defineItemLabel({
                    name: "team",
                    id: newValues.team,
                    items: availableTeams,
                  })}
                  multiple={false}
                />
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
