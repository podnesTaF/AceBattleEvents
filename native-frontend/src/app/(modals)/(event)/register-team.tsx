import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import FormButton from "@Components/common/forms/FormButton";
import PickField from "@Components/common/forms/PickField";
import { coaches, teams } from "@Constants/dummy-data";
import { Box, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { RegisterTeamForm } from "@lib/models";
import {
  clearAllItems,
  selectItems,
  selectUser,
  selectValues,
  setItems,
} from "@lib/store";
import {
  defineItemLabel,
  mapCoachesToPickItems,
  mapTeamsToPickItems,
  registerTeamSchema,
} from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RegisterTeamModal = () => {
  const params = useLocalSearchParams<{ eventId?: string }>();
  const user = useAppSelector(selectUser);
  const { newValues } = useAppSelector(selectValues);
  const { availableTeams, availableCoaches } = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  const form = useForm<RegisterTeamForm>({
    mode: "onChange",
    resolver: yupResolver(registerTeamSchema),
  });

  useEffect(() => {
    dispatch(clearAllItems());
    dispatch(
      setItems({
        key: "availableTeams",
        items: mapTeamsToPickItems(teams),
      })
    );
    dispatch(
      setItems({
        key: "availableCoaches",
        items: mapCoachesToPickItems(coaches),
      })
    );
  }, [params.eventId]);

  useEffect(() => {
    form.setValue("coach", newValues.coach);
    form.setValue("team", newValues.team);
  }, [newValues.coach, newValues.team]);

  const onRegister = (dto: RegisterTeamForm) => {
    console.log(dto);
  };

  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: ({ tintColor }) => (
            <HeaderSubtitledTitle
              tintColor={tintColor}
              title={"Register Your Team"}
            />
          ),
        }}
      />
      <Box my={"$4"}>
        <Container vertical={true}>
          <FormProvider {...form}>
            <VStack space="xs">
              <PickField
                name="team"
                label={"Choose Team"}
                placeholder={defineItemLabel({
                  name: "team",
                  id: newValues.team,
                  items: availableTeams,
                })}
                multiple={false}
              />
              <PickField
                name="coach"
                label={"Coach"}
                placeholder={defineItemLabel({
                  name: "coach",
                  id: newValues.coach,
                  items: availableCoaches,
                })}
                multiple={false}
              />
            </VStack>
            <FormButton
              my={"$4"}
              title={"Register Team"}
              onPress={form.handleSubmit(onRegister)}
              isLoading={
                form.formState.isLoading || form.formState.isSubmitting
              }
              disabled={form.formState.isSubmitting}
            />
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default RegisterTeamModal;
