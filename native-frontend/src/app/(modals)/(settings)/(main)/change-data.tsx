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

const ChangeUserData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { defaultValues } = useAppSelector(selectValues);
  const [updateUser, { isLoading, data }] = useUpdateUserDataMutation();
  const [addImage, { error: uploadingError }] = useUploadImageMutation();
  const navigation = useNavigation();

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
          headerTitle: (props) => (
            <VStack py="$1">
              <Text color={props.tintColor} size="md">
                Settings
              </Text>
              <Heading size="lg" color={props.tintColor}>
                Change Profile Data
              </Heading>
            </VStack>
          ),
        }}
      />
      <Box my={"$4"}>
        <Container vertical={true}>
          <FormProvider {...form}>
            <VStack>
              <FormField
                name="name"
                label={"Name"}
                placeholder={"Enter your name"}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="surname"
                label={"Surname"}
                placeholder={"Enter your surname"}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="city"
                label={"City"}
                placeholder={"Enter your city"}
                variant={"underlined"}
                size={"md"}
              />
              <FormField
                name="country"
                label={"Country"}
                placeholder={"Enter your country"}
                variant={"underlined"}
                size={"md"}
              />
              <FormImagePicker
                name={"image"}
                label={"Your Image"}
                placeholder="Select Image"
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
              title={"Save"}
            />
          </FormProvider>
        </Container>
      </Box>
    </>
  );
};

export default ChangeUserData;
