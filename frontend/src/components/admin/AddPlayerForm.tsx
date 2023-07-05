import { addPlayerSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddPlayerInfo from "../shared/AddPlayerInfo";

import FormButton from "@/components/shared/FormButton";
import AddImageDialog from "./AddImageDialog";

interface AddPlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ isOpen, onClose }) => {
  const [playerImageOpen, setPlayerImageOpen] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<{
    url: string;
    name: string;
  }>({ url: "", name: "" });

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(addPlayerSchema),
  });

  const { formState } = form;

  const onSubmit = (dto: any) => {
    console.log(dto);
  };

  return (
    <div className="rounded-md shadow-md p-4 mx-4 lg:mx-auto max-w-4xl">
      <div className="mb-4 w-full flex">
        <h3 className="text-2xl font-semibold">Player Info</h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <FormProvider {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row flex-wrap gap-3 mb-3 justify-around">
              <AddPlayerInfo
                errorState={formState?.errors}
                errorInstance={formState.errors}
                name={""}
              />
              <div className="flex gap-4 mb-4 items-center">
                <h4 className="text-gray uppercase text-lg font-semibold">
                  UPLOAD AVATAR
                </h4>
                <button
                  className="px-4 py-2 rounded-md bg-red-500 text-xl text-white font-semibold"
                  onClick={() => setPlayerImageOpen(true)}
                >
                  Open Storage
                </button>
              </div>
            </div>

            {avatarPreview.url && (
              <div className="mb-4 flex w-full justify-center gap-4">
                <h4 className="text-xl text-gray-500">{avatarPreview.name}</h4>
                <Image
                  src={avatarPreview.url}
                  alt={"avatar preview"}
                  width={400}
                  height={400}
                />
              </div>
            )}
            <AddImageDialog
              isOpen={playerImageOpen}
              handleClose={() => setPlayerImageOpen(false)}
              name={"avatar"}
              setIntroPreview={setAvatarPreview}
            />
            <div className="max-w-xs ml-auto">
              <FormButton
                title="create player"
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
