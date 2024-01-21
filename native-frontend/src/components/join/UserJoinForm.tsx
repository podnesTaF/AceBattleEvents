import FormCheckbox from "@Components/common/forms/FormCheckbox";
import FormField from "@Components/common/forms/FormField";
import FormImagePicker from "@Components/common/forms/FormImagePicker";
import FormSelect from "@Components/common/forms/FormSelect";
import PhoneField from "@Components/common/forms/PhoneField";
import PickField from "@Components/common/forms/PickField";
import { availableCountries } from "@Constants/country-codes";
import { Box, Heading, Image, Text, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector, useJoinUserTabs } from "@lib/hooks";
import { IMedia } from "@lib/models";
import { useRegisterUserMutation, useUploadImageMutation } from "@lib/services";
import { clearAllValues, selectValues } from "@lib/store";
import { CreateUserSchema, createUserSchema, uploadImage } from "@lib/utils";
import { useRouter } from "expo-router";
import { MailIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import StepLayout from "./StepLayout";

const UserJoinForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { newValues } = useAppSelector(selectValues);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [uploadMedia, { isLoading: isMediaLoading, error: mediaError }] =
    useUploadImageMutation();
  const { t } = useTranslation();
  const tabs = useJoinUserTabs();

  const [email, setEmail] = useState("");

  const form = useForm<CreateUserSchema>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
  });

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

  const onNext = async (isSubmit?: boolean) => {
    if (isSubmit) {
      form.handleSubmit(onSubmit)();
    } else if (activeStep === 3) {
      dispatch(clearAllValues());
      router.push("/(drawer)/(tabs)/home");
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const onBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };

  const onSubmit = async (data: CreateUserSchema) => {
    let image: IMedia | null = null;
    let avatar: IMedia | null = null;

    try {
      if (data.avatar) {
        const newImage = await uploadImage(data.avatar);
        avatar = newImage;
      }
      if (data.image) {
        const newImage = await uploadImage(data.image);
        image = newImage;
      }
    } catch (error) {
      form.setError("root", { message: "Error uploading new image" });
      return;
    }

    let country = availableCountries.find(
      (c) => c.id === +newValues?.country
    )?.title;

    if (!country) {
      form.setError("root", { message: "You did not provide country" });
      return;
    }

    try {
      const user = await registerUser({
        ...data,
        avatar,
        image,
        country,
      }).unwrap();

      if (user) {
        setEmail(user.email);
        setActiveStep(activeStep + 1);
      }
    } catch (error: any) {
      if (error.status === 403) {
        form.setError("email", {
          type: "manual",
          message: "The email is already taken",
        });
      } else if (error.status === 401) {
        form.setError("root", {
          message: error.data?.message?.join(", ") || "Error registering user",
        });
      }
    }
  };

  const onImagePicked = (image: string, name: string) => {
    if (name === "avatar") {
      form.setValue("avatar", image);
    } else if (name === "image") {
      form.setValue("image", image);
    }
  };

  return (
    <FormProvider {...form}>
      <StepLayout
        tabName={tabs[activeStep]}
        onNext={onNext}
        onBack={onBack}
        isFisrt={activeStep === 0}
        isSubmit={activeStep === 2}
        goHome={activeStep === 3}
      >
        <ScrollView>
          <VStack space="md">
            {activeStep === 0 && (
              <>
                <FormField
                  name={"name"}
                  label={t("userJoinForm.firstNameLabel")}
                  placeholder={t("userJoinForm.firstNamePlaceholder")}
                  variant="underlined"
                  inputProportion={3}
                  vertical={true}
                />
                <FormField
                  name={"surname"}
                  label={t("userJoinForm.lastNameLabel")}
                  placeholder={t("userJoinForm.lastNamePlaceholder")}
                  variant="underlined"
                  inputProportion={3}
                  vertical={true}
                />
                <Box w={"$full"}>
                  <PickField
                    name={"country"}
                    label={t("userJoinForm.countryLabel")}
                    placeholder={
                      newValues?.country
                        ? availableCountries.find(
                            (c) => c.id === newValues.country
                          )!.title
                        : t("userJoinForm.countryLabel")
                    }
                  />
                </Box>
                <FormField
                  name={"city"}
                  label={t("userJoinForm.cityLabel")}
                  placeholder={t("userJoinForm.cityPlaceholder")}
                  variant="underlined"
                  inputProportion={3}
                  vertical={true}
                />
                <FormSelect
                  label={t("userJoinForm.ageRangeLabel")}
                  defaultPlaceholder={t("userJoinForm.ageRangePlaceholder")}
                  name="ageRange"
                  defaultValue={form.getValues("ageRange") || ""}
                  items={[
                    {
                      label: t("userJoinForm.ageRanges.under18"),
                      value: "Under 18",
                    },
                    {
                      label: t("userJoinForm.ageRanges.18to25"),
                      value: "18-25",
                    },
                    {
                      label: "26-35",
                      value: "26-35",
                    },
                    {
                      label: "36-45",
                      value: "36-45",
                    },
                    {
                      label: "45+",
                      value: "45+",
                    },
                  ]}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <FormImagePicker
                  placeholder={
                    form.getValues("avatar") ? "File Picked" : "Choose a file"
                  }
                  imageUrl={form.getValues("avatar")}
                  name={"avatar"}
                  label={t("userJoinForm.uploadAvatarLabel")}
                  onImagePicked={onImagePicked}
                  vertical={true}
                  withoutUnderline={true}
                  withPreview={true}
                  type="avatar"
                />
                <FormImagePicker
                  placeholder={
                    form.getValues("image") ? "File Picked" : "Choose a file"
                  }
                  name={"image"}
                  imageUrl={form.getValues("image")}
                  label={t("userJoinForm.uploadProfileImageLabel")}
                  onImagePicked={onImagePicked}
                  vertical={true}
                  withoutUnderline={true}
                  withPreview={true}
                  type="image"
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                <FormField
                  name={"email"}
                  label={t("userJoinForm.emailLabel")}
                  placeholder={t("userJoinForm.emailPlaceholder")}
                  variant="underlined"
                  inputProportion={3}
                  vertical={true}
                  labelIcon={MailIcon}
                />
                <PhoneField
                  name={"phone"}
                  defaultValue={form.getValues("countryCode")}
                  label={t("userJoinForm.phoneLabel")}
                  placeholder={t("userJoinForm.phonePlaceholder")}
                />
                <FormCheckbox
                  size={"md"}
                  name={"agreeTerms"}
                  label={t("userJoinForm.agreeTermsLabel")}
                />
                <FormCheckbox
                  size={"md"}
                  name={"agreeNews"}
                  label={t("userJoinForm.agreeNewsLabel")}
                />
                <Box w={"$full"} mt={"$4"}>
                  <Text textAlign="center" size={"sm"} color={"$red400"}>
                    {form.formState.errors.root?.message}
                  </Text>
                </Box>
              </>
            )}
            {activeStep === 3 && (
              <VStack
                space="lg"
                justifyContent="center"
                alignItems="center"
                my={"$4"}
              >
                <Heading textAlign="center" size="lg">
                  {t("userJoinForm.confirmationRequired")}
                </Heading>
                <Image
                  role="img"
                  source={require("@Assets/images/confirm-email.png")}
                  width={140}
                  height={80}
                  alt="confirm email"
                  resizeMode="contain"
                />
                <Heading textAlign="center" size={"sm"}>
                  {t("userJoinForm.confirmationEmailSentPart1")}{" "}
                  <Heading size="sm" color={"$primary400"}>
                    {email}
                  </Heading>{" "}
                  {t("userJoinForm.confirmationEmailSentPart2")}
                </Heading>
              </VStack>
            )}
          </VStack>
        </ScrollView>
      </StepLayout>
    </FormProvider>
  );
};

export default UserJoinForm;
