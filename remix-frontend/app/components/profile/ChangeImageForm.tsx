import { useNavigate } from "@remix-run/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { IUser } from "~/lib/user/types/IUser";
import AddImageDialog from "../media/AddImageDialog";

interface Props {
  setEditImageDialogOpen: Function;
  editImageDialogOpen: boolean;
  user: IUser;
  token: string;
}

const ChangeImageForm: React.FC<Props> = ({
  setEditImageDialogOpen,
  editImageDialogOpen,
  token,
  user,
}) => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
  });

  const onCloseDialog = (image?: any) => {
    if (image.title) {
      onAddProfileImage(image);
    }
    setEditImageDialogOpen(false);
  };

  const onAddProfileImage = async (dto: any) => {
    if (!dto || !user) return;
    try {
      await Api(token).users.updateImage(dto.id);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onAddProfileImage)}>
        <AddImageDialog
          isOpen={editImageDialogOpen}
          handleClose={onCloseDialog}
          name={"image"}
          instantUpload={true}
          setIntroPreview={() => {}}
        />
      </form>
    </FormProvider>
  );
};

export default ChangeImageForm;
