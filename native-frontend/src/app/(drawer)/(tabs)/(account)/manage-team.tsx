import Container from "@Components/common/Container";
import FormField from "@Components/common/forms/FormField";
import PickField from "@Components/common/forms/PickField";
import { runners, teams } from "@Constants/dummy-data";
import { Box, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  selectManageTeam,
  setAvailablePlayers,
  setDefaultTeam,
  setInputValue,
} from "@lib/teams/slices";
import { AddTeamSchema, mapRunnersToPickItems } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ManageTeam = () => {
  const params = useLocalSearchParams<{ teamId?: string }>();
  const dispatch = useDispatch();
  const { defaultTeam, newValues } = useSelector(selectManageTeam);

  useEffect(() => {
    if (params.teamId) {
      dispatch(setDefaultTeam(teams[0]));
    }
    dispatch(setAvailablePlayers(mapRunnersToPickItems(runners)));
  }, [params.teamId]);

  useEffect(() => {
    form.setValue("coach", newValues.coach);
    form.setValue("players", newValues.players);
  }, [newValues.coach, newValues.players]);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
    defaultValues: {
      ...defaultTeam,
    },
  });

  const customOnChange = (value: string, name: string) => {
    dispatch(setInputValue({ name, value }));
  };

  const onSubmit = async (dto: any) => {
    console.log(dto);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#1C1E1F",
          },
          headerTintColor: "#fff",
          headerTitle: "Manage Teams",
        }}
      />
      <Box my={"$4"}>
        <Container vertical={true}>
          <FormProvider {...form}>
            <VStack>
              <FormField
                name="name"
                label={"Team Name"}
                placeholder={"Enter team name"}
                variant={"underlined"}
                size={"md"}
                customOnChange={customOnChange}
              />
              <FormField
                name="city"
                label={"City"}
                placeholder={"Enter city"}
                variant={"underlined"}
                size={"md"}
                customOnChange={customOnChange}
              />
              <PickField
                name="coach"
                label={"Coach"}
                placeholder={"Select coach"}
                multiple={false}
              />
            </VStack>
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default ManageTeam;
