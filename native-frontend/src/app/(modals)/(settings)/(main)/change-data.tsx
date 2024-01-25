import Container from "@Components/common/Container";
import FormButton from "@Components/common/forms/FormButton";
import FormField from "@Components/common/forms/FormField";
import FormImagePicker from "@Components/common/forms/FormImagePicker";
import { Box, Heading, Text, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { IMedia } from "@lib/models";
import { useUploadImageMutation } from "@lib/services";
import {
  clearAllValues,
  selectUser,
  selectValues,
  setDefalutValues,
  setFormValue,
  updateUserData,
} from "@lib/store";
import { useUpdateUserDataMutation } from "@lib/user/services/UserService";
import { updateUserDataSchema, uploadImage } from "@lib/utils";
import { Stack, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, SafeAreaView } from "react-native";

const ChangeUserData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { defaultValues } = useAppSelector(selectValues);
  const [updateUser, { isLoading, data }] = useUpdateUserDataMutation();
  const [addImage, { error: uploadingError }] = useUploadImageMutation();
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  const { t } = useTranslation();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(updateUserDataSchema),
  });

  useEffect(() => {
    dispatch(clearAllValues());
    if (user?.id) {
      dispatch(
        setDefalutValues({
          defaultValues: {
            image: user.image,
            ...user,
          },
          newValues: {},
        })
      );
    }
  }, [user?.id]);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  const onImagePicked = (image: string, name: string) => {
    if (name === "image") {
      dispatch(setFormValue({ key: "image", value: image }));
      form.setValue("image", image);
    }
  };

  const onSubmit = async (dto: any) => {
    // handle image upload
    let image: IMedia | undefined;
    if (dto.image) {
      try {
        const newImage = await uploadImage(dto.image);
        image = newImage;
      } catch (error) {
        form.setError("image", { message: "error uploading new image" });
      }
    }

    // update user

    try {
      const updatedUser = await updateUser({
        ...dto,
        image,
      }).unwrap();

      dispatch(updateUserData(updatedUser));

      navigation.goBack();
    } catch (error) {
      form.setError("root", { message: "error updating user" });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ backgroundColor: "#1C1E1F" }}>
              <VStack
                width={width}
                justifyContent="center"
                alignItems="center"
                py="$1"
              >
                <Text color={"#fff"} size="md">
                  {t("accountItems.settings.title")}
                </Text>
                <Heading size="lg" color={"#fff"}>
                  {t("settings.changeProfileData")}
                </Heading>
              </VStack>
            </SafeAreaView>
          ),
        }}
      />
      <Box my={"$4"}>
        <Container vertical={true}>
          <FormProvider {...form}>
            <VStack>
              <FormField
                name="name"
                label={t("userJoinForm.firstNameLabel")}
                placeholder={t("userJoinForm.firstNamePlaceholder")}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="surname"
                label={t("userJoinForm.lastNameLabel")}
                placeholder={t("userJoinForm.lastNamePlaceholder")}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="city"
                label={t("userJoinForm.cityLabel")}
                placeholder={t("userJoinForm.cityPlaceholder")}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="country"
                label={t("fields.country")}
                placeholder={t("fields.countryPlaceholder")}
                variant={"underlined"}
                size={"md"}
              />
              <FormImagePicker
                name={"image"}
                label={t("settings.yourImage")}
                placeholder={t("settings.selectImage")}
                defaultImageName={defaultValues?.image?.title}
                onImagePicked={onImagePicked}
              />
            </VStack>
            <FormButton
              isDisabled={
                !form.formState.isValid || form.formState.isSubmitting
              }
              isLoading={form.formState.isSubmitting}
              onPress={form.handleSubmit(onSubmit)}
              title={t("common.save")}
            />
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default ChangeUserData;
