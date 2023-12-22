import Container from "@Components/common/Container";
import FormField from "@Components/common/forms/FormField";
import FormImagePicker from "@Components/common/forms/FormImagePicker";
import FormRadioGroup from "@Components/common/forms/FormRadioGroup";
import PickField from "@Components/common/forms/PickField";
import { Box, Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@lib/hooks";
import {
  useGetRunnersByManagerQuery,
  useGetTeamInfoQuery,
} from "@lib/services";
import {
  clearAllItems,
  clearAllValues,
  selectItems,
  selectUser,
  selectValues,
  setDefalutValues,
  setFormValue,
  setItems,
} from "@lib/store";
import { useGetCoachesByManagerQuery } from "@lib/user/services/CoachService";
import {
  AddTeamSchema,
  cutString,
  defineItemLabel,
  getTeamFormValues,
  mapCoachesToPickItems,
  mapRunnersToPickItems,
} from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ManageTeam = () => {
  const { teamId } = useLocalSearchParams<{ teamId?: string }>();
  const dispatch = useDispatch();
  const { newValues, defaultValues } = useAppSelector(selectValues);
  const { availableCoaches } = useAppSelector(selectItems);
  const user = useAppSelector(selectUser);
  const { data: team, isLoading } = useGetTeamInfoQuery(
    teamId ? +teamId : undefined
  );
  const { data: coaches, isLoading: isCoachesLoading } =
    useGetCoachesByManagerQuery({ userId: user?.id });
  const { data: runners, isLoading: isRunnersLoading } =
    useGetRunnersByManagerQuery(user?.id);

  useEffect(() => {
    dispatch(clearAllValues());
    form.reset();
  }, [teamId]);

  useEffect(() => {
    if (team) {
      dispatch(setDefalutValues(getTeamFormValues(team)));
    }
  }, [team]);

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
    if (runners) {
      dispatch(
        setItems({
          key: "availablePlayers",
          items: mapRunnersToPickItems(runners),
        })
      );
    }
  }, [runners]);

  useEffect(() => {
    if (teamId) {
      setFormDefaultValues();
    }
  }, [defaultValues]);

  useEffect(() => {
    form.setValue("coach", newValues.coach);
    form.setValue("players", newValues.players);
  }, [newValues.coach, newValues.players]);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
  });

  const setFormDefaultValues = () => {
    form.setValue("name", defaultValues?.name || "");
    form.setValue("city", defaultValues?.city || "");
    form.setValue("gender", defaultValues?.gender || "");
    form.setValue("logo", defaultValues?.logo?.mediaUrl || "");
    form.setValue("teamImage", defaultValues?.teamImage?.mediaUrl || "");
  };

  const customOnChange = (value: string, name: string) => {
    dispatch(setFormValue({ key: name, value }));
  };

  const onImagePicked = (image: string, name: string) => {
    if (name === "logo") {
      dispatch(setFormValue({ key: "logo", value: image }));
      form.setValue("logo", image);
    } else if (name === "teamImage") {
      dispatch(setFormValue({ key: "teamImage", value: image }));
      form.setValue("teamImage", image);
    }
  };

  const onSubmit = async (dto: any) => {
    console.log(dto);
    dispatch(clearAllItems());
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
            <VStack space="xs">
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
                placeholder={defineItemLabel({
                  name: "coach",
                  id: newValues.coach,
                  items: availableCoaches,
                })}
                multiple={false}
              />
              <FormRadioGroup
                name={"gender"}
                parentLabel={"Team Type"}
                options={[
                  {
                    label: "Men's",
                    value: "male",
                  },
                  {
                    label: "Women's",
                    value: "female",
                  },
                ]}
              />
              <PickField
                name="players"
                label={"Players"}
                placeholder={
                  newValues.players?.length
                    ? cutString(
                        `${newValues.players.length} players selected`,
                        20
                      )
                    : "No runners selected"
                }
                multiple={true}
              />
              <FormImagePicker
                placeholder="Select team logo"
                name="logo"
                defaultImageName={defaultValues?.logo?.title}
                onImagePicked={onImagePicked}
                label="Team Logo"
              />
              <FormImagePicker
                placeholder="Select team image"
                name="teamImage"
                defaultImageName={defaultValues?.teamImage?.title}
                onImagePicked={onImagePicked}
                label="Team Image"
              />
            </VStack>
            <Button my={"$4"} onPress={form.handleSubmit(onSubmit)}>
              <ButtonText>Save</ButtonText>
            </Button>
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default ManageTeam;
