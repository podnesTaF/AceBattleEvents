import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { IAdmin } from "~/lib/types";
import { createAdminSchema } from "~/lib/utils";
import { FormButton, FormField, MessageDialog } from "../shared";

const CreateAdminForm = ({ me }: { me: IAdmin | null }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "",
    message: "",
  });
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(createAdminSchema),
    mode: "onChange",
  });

  const handleClose = () => {
    setDialogOpen(false);
    navigate("/admin");
  };

  const onSubmit = async (dto: any) => {
    try {
      const newAdmin = await Api(me?.token).admin.registerAdmin(dto);

      if (newAdmin) {
        setDialogData({
          title: "Success",
          message:
            "New admin created successfully. The admin will receive an email with temporary password.",
        });
        setDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
      setDialogData({
        title: "Error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="w-full lg:max-w-2xl mx-auto shadow-md rounded-md my-4 p-4">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            label="First name*"
            placeholder="Enter your name"
          />
          <FormField
            name="surname"
            label="Surname*"
            placeholder="Enter your surname"
          />
          <FormField
            name="email"
            label="Email*"
            placeholder="Enter your email"
          />
          <FormField
            name="password"
            type="password"
            autoGenerate={true}
            placeholder="enter a password"
            label="Password*"
          />
          <FormButton
            title="Register New Admin"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
          />
        </form>
      </FormProvider>
      <MessageDialog
        open={dialogOpen}
        title={dialogData.title}
        message={dialogData.message}
        handleClose={handleClose}
      />
    </div>
  );
};

export default CreateAdminForm;
