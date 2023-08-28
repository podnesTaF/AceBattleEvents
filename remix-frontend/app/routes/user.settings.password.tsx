import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderArgs } from "@remix-run/node";
import { FormProvider, useForm } from "react-hook-form";
import { FormButton, FormField, FormPartsLayout } from "~/components";
import AdminHeader from "~/components/admin/AdminHeader";
import { changePasswordSchema } from "~/lib/user/utils/shemas";
import { authenticator } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return { user };
};

const ChangePassword = () => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: any) => {};

  return (
    <div className="w-full">
      <AdminHeader
        title="Password"
        pageName="Settings"
        description="Settings"
      />
      <div className="w-full sm:max-w-lg mx-4 md:mx-auto my-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormPartsLayout title={"Change Password"}>
              <div className="w-full">
                <FormField
                  name="oldPassword"
                  type="password"
                  placeholder="enter an old password"
                  label="Old Password*"
                />
              </div>
              <div className="w-full">
                <FormField
                  name="newPassword"
                  type="password"
                  placeholder="enter a new password"
                  label="New Password*"
                />
              </div>
              <div className="w-full">
                <FormField
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm a password"
                  label="Confirm Password*"
                />
              </div>
              <div className="w-full">
                <FormButton
                  title="Change Password"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                  isLoading={form.formState.isSubmitting}
                />
              </div>
            </FormPartsLayout>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePassword;
