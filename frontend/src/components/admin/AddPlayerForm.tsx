import { addPlayerSchema } from "@/utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddPlayerInfo from "../shared/AddPlayerInfo";

import FormButton from "@/components/shared/FormButton";
import { IPlayer } from "@/models/ITeam";
import {
  useAddPlayerMutation,
  useUpdatePlayerMutation,
} from "@/services/playerService";
import ImageField from "../shared/ImageField";
import AddImageDialog from "./AddImageDialog";

interface AddPlayerFormProps {
  isOpen: boolean;
  player?: IPlayer;
  onClose: () => void;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ player, onClose }) => {
  const [playerImageOpen, setPlayerImageOpen] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<{
    url: string;
    name: string;
  }>({ url: "", name: "" });

  const [addPlayer] = useAddPlayerMutation();
  const [updatePlayer] = useUpdatePlayerMutation();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(addPlayerSchema),
  });

  const { formState, setValue } = form;

  const onSubmit = (dto: any) => {
    try {
      if (player) {
        updatePlayer({ ...dto, id: player.id });
      } else {
        addPlayer(dto);
      }
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (player) {
      setAvatarPreview({
        url: player.image?.mediaUrl || "",
        name: player.image?.title || "",
      });

      setValue("name", player.name);
      setValue("surname", player.surname);
      setValue("dateOfBirth", player.dateOfBirth);
      setValue("gender", player.gender);
      setValue("image", player?.image || "");
    }
  }, [player]);

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
              <div className="mx-auto">
                <ImageField title="upload avatar" name="image" />
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
              name={"image"}
              setIntroPreview={setAvatarPreview}
            />
            <div className="max-w-xs ml-auto">
              <FormButton
                title={player ? "Update Player" : "Add Player"}
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
