import FormCheckbox from "@Components/common/forms/FormCheckbox";
import FormDatePicker from "@Components/common/forms/FormDatePicker";
import FormRadioGroup from "@Components/common/forms/FormRadioGroup";
import FormSelect from "@Components/common/forms/FormSelect";
import PickField from "@Components/common/forms/PickField";
import ResultInput from "@Components/common/forms/ResultInput";
import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAppDispatch,
  useAppSelector,
  useJoinRunnerTabs,
  useManagerOptions,
} from "@lib/hooks";
import { useRegisterRunnerMutation } from "@lib/services";
import {
  clearAllItems,
  clearAllValues,
  selectItems,
  selectValues,
  setItems,
  updateUserField,
} from "@lib/store";
import { useGetAllManagersQuery } from "@lib/user/services/ManagerService";
import {
  CreateRunnerSchema,
  createRunnerSchema,
  defineItemLabel,
  mapManagersToPickItems,
} from "@lib/utils";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { PlusCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import StepLayout from "./StepLayout";

const RunnerJoinForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { newValues } = useAppSelector(selectValues);
  const { availableManagers } = useAppSelector(selectItems);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [managerOption, setManagerOption] = useState<string>("choose-manager");
  const { data: managers, isLoading: managersLoading } =
    useGetAllManagersQuery();

  const managerOptions = useManagerOptions();

  const tabs = useJoinRunnerTabs();

  const { t } = useTranslation();

  const [registerRunner, { isLoading, error }] = useRegisterRunnerMutation();

  useEffect(() => {
    if (managers) {
      dispatch(
        setItems({
          key: "availableManagers",
          items: mapManagersToPickItems(managers),
        })
      );
    }
  }, [managers]);

  const form = useForm<CreateRunnerSchema>({
    mode: "onChange",
    resolver: yupResolver(createRunnerSchema),
  });

  const onNext = async (isSubmit?: boolean) => {
    if (isSubmit) {
      const isValid = await form.trigger();
      if (isValid) {
        form.handleSubmit(onSubmit)();
      }
    } else if (activeStep === 5) {
      router.replace("/(drawer)/(tabs)/(account)");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const onBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };

  const onSubmit = async (data: CreateRunnerSchema) => {
    try {
      const res = await registerRunner({
        ...data,
      }).unwrap();

      if (res.success) {
        setActiveStep(activeStep + 1);
        dispatch(
          updateUserField({ field: "rolePending", value: "runner" as never })
        );
        dispatch(clearAllValues());
        dispatch(clearAllItems());
      }
    } catch (error: any) {
      console.log(error);
      form.setError("root", {
        type: "manual",
        message:
          error.message || "Something went wrong when registering runner",
      });
    }
  };

  useEffect(() => {
    if (!form.formState.errors.root) return;
    const timeout = setTimeout(() => {
      form.clearErrors("root");
    }, 3000);

    return () => {
      form.clearErrors("root");
      clearTimeout(timeout);
    };
  }, [form.formState.errors.root]);

  const { append: appendPb, remove: removePb } = useFieldArray({
    control: form.control,
    name: "personalBests",
  });

  const { append: appendSb, remove: removeSb } = useFieldArray({
    control: form.control,
    name: "seasonBests",
  });

  return (
    <FormProvider {...form}>
      <StepLayout
        tabName={tabs[activeStep]}
        onBack={onBack}
        onNext={onNext}
        isFisrt={activeStep === 0}
        isSubmit={activeStep === 4}
        goHome={activeStep === 5}
      >
        <ScrollView>
          <VStack space="md" minHeight={200}>
            {activeStep === 0 && (
              <>
                <FormSelect
                  label={t("runnerForm.categoryLabel")}
                  defaultPlaceholder={t("runnerForm.categoryPlaceholder")}
                  defaultValue={form.getValues("category") || ""}
                  name="category"
                  items={[
                    {
                      label: t("runnerForm.categoryOptions.professional"),
                      value: "professional",
                    },
                    {
                      label: t("runnerForm.categoryOptions.amateur"),
                      value: "amateur",
                    },
                  ]}
                />
                <FormRadioGroup
                  name="gender"
                  options={[
                    {
                      label: t("gender.male"),
                      value: "male",
                    },
                    {
                      label: t("gender.female"),
                      value: "female",
                    },
                  ]}
                  parentLabel={t("gender.genderLabel")}
                />
                <FormDatePicker
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Select your date of birth"
                  mode="date"
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <Heading size={"sm"}>{t("runnerForm.personalBests")}</Heading>
                {form.watch("personalBests")?.map(
                  (
                    field: {
                      distanceInCm: string;
                      result: string;
                    },
                    i
                  ) => (
                    <ResultInput
                      key={i}
                      field={field}
                      remove={removePb}
                      i={i}
                      name="personalBests"
                    />
                  )
                )}
                <HStack space={"md"} mt={"$2"} alignItems="center" w={"$full"}>
                  <Divider flex={1} />
                  <Pressable
                    onPress={() =>
                      appendPb({
                        distanceInCm: "",
                        result: "",
                      })
                    }
                  >
                    {({ pressed }: { pressed: boolean }) => (
                      <Icon
                        as={PlusCircle}
                        opacity={pressed ? 0.8 : 1}
                        size={"lg"}
                        color={"$coolGray400"}
                      />
                    )}
                  </Pressable>
                  <Divider flex={1} />
                </HStack>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Heading size={"sm"}>{t("runnerForm.seasonBests")}</Heading>
                {form.watch("seasonBests")?.map(
                  (
                    field: {
                      distanceInCm: string;
                      result: string;
                    },
                    i
                  ) => (
                    <ResultInput
                      key={i}
                      field={field}
                      remove={removeSb}
                      i={i}
                      name="seasonBests"
                    />
                  )
                )}
                <HStack space={"md"} mt={"$2"} alignItems="center" w={"$full"}>
                  <Divider flex={1} />
                  <Pressable
                    onPress={() =>
                      appendSb({
                        distanceInCm: "",
                        result: "",
                      })
                    }
                  >
                    {({ pressed }: { pressed: boolean }) => (
                      <Icon
                        as={PlusCircle}
                        opacity={pressed ? 0.8 : 1}
                        size={"lg"}
                        color={"$coolGray400"}
                      />
                    )}
                  </Pressable>
                  <Divider flex={1} />
                </HStack>
              </>
            )}
            {activeStep === 3 && (
              <>
                <FormRadioGroup
                  name="managerOption"
                  options={managerOptions}
                  customOnChange={(value) => {
                    setManagerOption(value);
                  }}
                />
                <Box my={"$4"}>
                  {managerOption === "choose-manager" && (
                    <PickField
                      name="manager"
                      placeholder={defineItemLabel({
                        name: "manager",
                        id: newValues.manager,
                        items: availableManagers,
                      })}
                      label="Manager"
                    />
                  )}
                  {managerOption === "location-manager" && (
                    <Heading size={"sm"} color={"$coolGray400"}>
                      {t("managerInfo.willAssignManager")}
                    </Heading>
                  )}
                  {managerOption === "no-manager" && (
                    <Heading size={"sm"} color={"$coolGray400"}>
                      {t("managerInfo.ableToChooseLater")}
                    </Heading>
                  )}
                </Box>
              </>
            )}
            {activeStep === 4 && (
              <VStack flex={1} space="lg" justifyContent="center">
                <FormCheckbox
                  name="runnerAgreement"
                  label={t("runnerForm.runnerAgreementLabel")}
                />
                <FormCheckbox
                  name="informationIsCorrect"
                  label={t("runnerForm.informationIsCorrectLabel")}
                />
                <Heading textAlign="center" size={"sm"} color={"$red400"}>
                  {form.formState.errors.root?.message}
                </Heading>
              </VStack>
            )}
            {activeStep === 5 && (
              <Center flex={1} justifyContent="space-around">
                <HStack
                  mb={"$4"}
                  justifyContent="center"
                  space={"lg"}
                  alignItems="center"
                >
                  <Image
                    style={{ width: 40, height: 55 }}
                    contentFit="contain"
                    source={require("@Assets/images/confirm-paper.png")}
                  />
                  <Heading size="md" flex={1}>
                    {t("runnerForm.applicationSentHeading")}
                  </Heading>
                </HStack>
                <Text color="$coolGray300" size="md">
                  {t("runnerForm.applicationSentHeading")}
                </Text>
              </Center>
            )}
          </VStack>
        </ScrollView>
      </StepLayout>
    </FormProvider>
  );
};

export default RunnerJoinForm;
