import FormField from "@Components/common/forms/FormField";
import FormSelect from "@Components/common/forms/FormSelect";
import PickField from "@Components/common/forms/PickField";
import { Box } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUserSchema, createUserSchema } from "@lib/utils";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import StepLayout from "./StepLayout";

const UserJoinForm = () => {
  const form = useForm<CreateUserSchema>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
  });

  return (
    <FormProvider {...form}>
      <StepLayout tabName="User" onNext={() => {}} onBack={() => {}}>
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
      </StepLayout>
    </FormProvider>
  );
};

export default UserJoinForm;
