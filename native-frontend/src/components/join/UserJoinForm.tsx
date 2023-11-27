import FormField from "@Components/common/forms/FormField";
import FormImagePicker from "@Components/common/forms/FormImagePicker";
import FormSelect from "@Components/common/forms/FormSelect";
import PhoneField from "@Components/common/forms/PhoneField";
import PickField from "@Components/common/forms/PickField";
import { Box } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUserSchema, createUserSchema } from "@lib/utils";
import { MailIcon } from "lucide-react-native";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import StepLayout from "./StepLayout";

const tabs = [
  "Personal Details",
  "Avatar and Image",
  "Contact and Agreements",
  "Confirm email",
];

const UserJoinForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm<CreateUserSchema>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
  });

  const onNext = (isSubmit?: boolean) => {
    if (isSubmit) {
      console.log(form.getValues());
      form.handleSubmit(onSubmit);
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

  const onSubmit = (data: CreateUserSchema) => {
    console.log("data", data);
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
        isSubmit={activeStep === 2}
      >
        <ScrollView>
          {activeStep === 0 && (
            <>
              <FormField
                name={"name"}
                label={"First Name"}
                placeholder={"Enter your name here"}
                variant="underlined"
                inputProportion={3}
                vertical={true}
              />
              <FormField
                name={"surname"}
                label={"Last Name"}
                placeholder={"Enter your surname here"}
                variant="underlined"
                inputProportion={3}
                vertical={true}
              />
              <Box w={"$full"}>
                <PickField
                  name={"country"}
                  label={"Country"}
                  placeholder={"Pick your country"}
                />
              </Box>
              <FormField
                name={"city"}
                label={"City"}
                placeholder={"Enter your city here"}
                variant="underlined"
                inputProportion={3}
                vertical={true}
              />
              <FormSelect
                defaultPlaceholder="Select your age range"
                label="Age Range"
                name="ageRange"
                items={[
                  {
                    label: "Under 18",
                    value: "Under 18",
                  },
                  {
                    label: "18-25",
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
                placeholder={"Choose a file"}
                name={"avatar"}
                label="Upload your avatar (Recommended)"
                onImagePicked={onImagePicked}
                vertical={true}
              />
              <FormImagePicker
                placeholder={"Choose a file"}
                name={"image"}
                label="Upload a profile Image (Optional)"
                onImagePicked={onImagePicked}
                vertical={true}
              />
            </>
          )}
          {activeStep === 2 && (
            <>
              <FormField
                name={"email"}
                label={"Email"}
                placeholder={"Enter your email here"}
                variant="underlined"
                inputProportion={3}
                vertical={true}
                labelIcon={MailIcon}
              />
              <PhoneField
                name={"phone"}
                label={"Phone"}
                placeholder={"Enter your phone number here"}
              />
            </>
          )}
        </ScrollView>
      </StepLayout>
    </FormProvider>
  );
};

export default UserJoinForm;
