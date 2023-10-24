import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AddImageDialog } from "..";
import { TabNames } from "../media/AddImageDialog";

interface Props {
  setEditImageDialogOpen: Function;
  editImageDialogOpen: boolean;
  successCallback: (dto: any) => void;
  onClose: (image?: any) => void;
  token?: string;
}

const ChangeImageForm: React.FC<Props> = ({
  editImageDialogOpen,
  successCallback,
  onClose,
  token,
}) => {
  const form = useForm({
    mode: "onChange",
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(successCallback)}>
        <AddImageDialog
          isOpen={editImageDialogOpen}
          handleClose={onClose}
          name={"image"}
          token={token}
          instantUpload={true}
          setIntroPreview={() => {}}
          tabs={[TabNames.upload]}
        />
      </form>
    </FormProvider>
  );
};

export default ChangeImageForm;
