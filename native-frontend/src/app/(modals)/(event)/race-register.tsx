import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import FormButton from "@Components/common/forms/FormButton";
import PickField from "@Components/common/forms/PickField";
import { Box, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@lib/hooks";
import { selectItems, selectValues } from "@lib/store";
import { cutString, registerForRaceSchema } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const RaceRegister = () => {
  const { eventId, raceId } = useLocalSearchParams();
  const { newValues } = useAppSelector(selectValues);
  const { availablePlayers } = useAppSelector(selectItems);

  // check if team can take part in the race

  const form = useForm<{ players: string[] }>({
    mode: "onChange",
    resolver: yupResolver(registerForRaceSchema),
  });

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
      <Box my={"$4"}>
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
            title={"Submit Registration"}
            isLoading={form.formState.isLoading || form.formState.isSubmitting}
            disabled={form.formState.isSubmitting || form.formState.isValid}
          />
        </FormProvider>
      </Box>
    </>
  );
};

export default RaceRegister;
