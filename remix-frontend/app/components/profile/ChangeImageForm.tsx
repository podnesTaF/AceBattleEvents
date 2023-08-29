import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AddImageDialog } from "..";

interface Props {
  setEditImageDialogOpen: Function;
  editImageDialogOpen: boolean;
  successCallback: (dto: any) => void;
  onClose: (image?: any) => void;
}

const ChangeImageForm: React.FC<Props> = ({
  editImageDialogOpen,
  successCallback,
  onClose,
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
          instantUpload={true}
          setIntroPreview={() => {}}
        />
      </form>
    </FormProvider>
  );
};

export default ChangeImageForm;
