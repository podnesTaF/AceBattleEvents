import Container from "@Components/common/Container";
import FormField from "@Components/common/forms/FormField";
import FormImagePicker from "@Components/common/forms/FormImagePicker";
import FormRadioGroup from "@Components/common/forms/FormRadioGroup";
import PickField from "@Components/common/forms/PickField";
import { coaches, runners, teams } from "@Constants/dummy-data";
import { Box, Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  resetTeam,
  selectManageTeam,
  setAvailableCoaches,
  setAvailablePlayers,
  setDefaultTeam,
  setInputValue,
  setLogo,
  setTeamImage,
} from "@lib/teams/slices";
import {
  AddTeamSchema,
  cutString,
  mapCoachesToPickItems,
  mapRunnersToPickItems,
} from "@lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ManageTeam = () => {
  const params = useLocalSearchParams<{ teamId?: string }>();
  const dispatch = useDispatch();
  const { defaultTeam, newValues, avaliableCoaches } =
    useSelector(selectManageTeam);

  useEffect(() => {
    dispatch(resetTeam());
    if (params.teamId) {
      dispatch(setDefaultTeam(teams[0]));
    }
    dispatch(setAvailablePlayers(mapRunnersToPickItems(runners)));
    dispatch(setAvailableCoaches(mapCoachesToPickItems(coaches)));
  }, [params.teamId]);

  useEffect(() => {
    setFormDefaultValues();
  }, [defaultTeam]);

  useEffect(() => {
    form.setValue("coach", newValues.coach);
    form.setValue("players", newValues.players);
  }, [newValues.coach, newValues.players]);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(AddTeamSchema),
  });

  const setFormDefaultValues = () => {
    form.setValue("name", defaultTeam?.name || "");
    form.setValue("city", defaultTeam?.city || "");
    form.setValue("gender", defaultTeam?.gender || "");
    form.setValue("logo", defaultTeam?.logo?.mediaUrl || "");
    form.setValue("teamImage", defaultTeam?.teamImage?.mediaUrl || "");
  };

  const defineCoachLabel = (id?: number) => {
    if (!id) return "No coach selected";
    const item = avaliableCoaches.find((coach) => coach.id === id);
    return cutString(item?.title || "", 20);
  };

  const customOnChange = (value: string, name: string) => {
    dispatch(setInputValue({ name, value }));
  };

  const onImagePicked = (image: string, name: string) => {
    if (name === "logo") {
      dispatch(setLogo(image));
      form.setValue("logo", image);
    } else if (name === "teamImage") {
      dispatch(setTeamImage(image));
      form.setValue("teamImage", image);
    }
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
                placeholder={defineCoachLabel(newValues.coach)}
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
                  newValues.players.length
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
                defaultImageName={defaultTeam?.logo?.title}
                onImagePicked={onImagePicked}
                label="Team Logo"
              />
              <FormImagePicker
                placeholder="Select team image"
                name="teamImage"
                defaultImageName={defaultTeam?.teamImage?.title}
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
