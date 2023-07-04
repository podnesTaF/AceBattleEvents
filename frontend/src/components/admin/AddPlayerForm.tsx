import { addPlayerSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddPlayerInfo from "../shared/AddPlayerInfo";

import FormButton from "@/components/shared/FormButton";

interface AddPlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ isOpen, onClose }) => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(addPlayerSchema),
  });

  const {formState} = form;

  const onSubmit = (dto: any) => {
    console.log(dto);
  }

  return (
    <div className="rounded-md shadow-md p-4 mx-4 lg:mx-auto max-w-4xl">
      <div className="mb-4 w-full flex">
        <h3 className="text-2xl font-semibold">Player Info</h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <FormProvider {...form}>
            <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
            <AddPlayerInfo
          errorState={formState?.errors}
          errorInstance={formState.errors}
          name={""}
        />
        <div className="max-w-xs">
                    <FormButton
                      title="create event"
                      disabled={!formState.isValid || formState.isSubmitting}
                      isSubmitting={formState.isSubmitting}
                      isLoading={formState.isSubmitting}
                    />
                  </div>
            </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddPlayerForm;
