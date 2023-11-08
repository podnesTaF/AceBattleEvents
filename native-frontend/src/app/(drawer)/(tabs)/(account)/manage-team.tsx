import Container from "@Components/common/Container";
import FormField from "@Components/common/forms/FormField";
import { Box, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddTeamSchema } from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const ManageTeam = () => {
  const params = useLocalSearchParams<{ teamId?: string }>();
  console.log(params.teamId);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
  });

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
              />
              <FormField
                name="city"
                label={"City"}
                placeholder={"Enter city"}
                variant={"underlined"}
                size={"md"}
              />
            </VStack>
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default ManageTeam;
