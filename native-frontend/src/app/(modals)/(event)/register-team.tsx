import Container from "@Components/common/Container";
import HeaderSubtitledTitle from "@Components/common/HeaderSubtitledTitle";
import FormButton from "@Components/common/forms/FormButton";
import PickField from "@Components/common/forms/PickField";
import { Box, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { RegisterTeamForm } from "@lib/models";
import { useGetTeamsByManagerQuery } from "@lib/services";
import {
  clearAllItems,
  selectItems,
  selectUser,
  selectValues,
  setItems,
} from "@lib/store";
import { useGetCoachesByManagerQuery } from "@lib/user/services/CoachService";
import {
  defineItemLabel,
  mapCoachesToPickItems,
  mapTeamsToPickItems,
  registerTeamSchema,
} from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router/src/useNavigation";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRegisterTeamMutation } from "teamRegistrationService";

const RegisterTeamModal = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ eventId?: string }>();
  const user = useAppSelector(selectUser);
  const { newValues } = useAppSelector(selectValues);
  const { availableTeams, availableCoaches } = useAppSelector(selectItems);

  const { data: teams, isLoading: isTeamsLoading } = useGetTeamsByManagerQuery({
    managerId: user?.id,
    unregistered: true,
    eventId: params.eventId,
  });

  const { data: coaches, isLoading: isCoachesLoading } =
    useGetCoachesByManagerQuery({
      userId: user?.id,
    });

  const [registerTeam] = useRegisterTeamMutation();

  const dispatch = useAppDispatch();

  const form = useForm<RegisterTeamForm>({
    mode: "onChange",
    resolver: yupResolver(registerTeamSchema),
  });

  useEffect(() => {
    dispatch(clearAllItems());
  }, [params.eventId]);

  useEffect(() => {
    if (teams) {
      dispatch(
        setItems({
          key: "availableTeams",
          items: mapTeamsToPickItems(teams),
        })
      );
    }
  }, [teams]);

  useEffect(() => {
    if (coaches) {
      dispatch(
        setItems({
          key: "availableCoaches",
          items: mapCoachesToPickItems(coaches),
        })
      );
    }
  }, [coaches]);

  useEffect(() => {
    form.setValue("coach", newValues.coach);
    form.setValue("team", newValues.team);
  }, [newValues.coach, newValues.team]);

  const onRegister = async (dto: RegisterTeamForm) => {
    try {
      const registration = await registerTeam({
        eventId: +params.eventId!,
        teamId: +dto.team,
        coachId: +dto.coach,
      }).unwrap();

      if (registration) {
        dispatch(clearAllItems());
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
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
