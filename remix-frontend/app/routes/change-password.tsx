import { LoaderArgs, json } from "@remix-run/node";

import { yupResolver } from "@hookform/resolvers/yup";
import { Snackbar } from "@mui/material";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { FormButton, FormField, FormPartsLayout } from "~/components";
import { createNewPasswordSchema } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  // localhost:4000/change-password?token=?&userId=?&type=admin
  const token = new URL(request.url).searchParams.get("token");
  const type = new URL(request.url).searchParams.get("type");
  console.log(token, type);

  if (!token || !type) {
    throw new Response("Invalid request");
  }

  let user: any;

  if (type === "admin") {
    user = await Api(token).admin.getMe();
  } else if (type === "user") {
    const isValidToken = await Api().users.checkToken(token);

    if (!isValidToken) {
      return json({
        user: null,
        token,
        type,
      });
    }

    user = await Api().users.getResetUser(token);
  }

  console.log("user", user);

  if (!user) {
    throw new Response("User not found");
  }

  return json({
    user,
    token,
    type,
  });
};

const ChangePasswordPage = () => {
  const { user, type, token } = useLoaderData<typeof loader>();
  const [statusAlert, setStatusAlert] = useState({
    message: "",
    isOpen: false,
  });

  const navigate = useNavigate();

  const form = useForm({
    mode: "onBlur",
    resolver: yupResolver(createNewPasswordSchema),
  });

  const onSubmit = async (dto: any) => {
    if (type === "admin") {
      const res = await Api(token).admin.setNewPassword(dto);
      setStatusAlert({
        message: res.message,
        isOpen: true,
      });
      navigate("/auth-admin");
    } else {
      const res = await Api().users.setNewPassword(user.id, {
        newPassword: dto.newPassword,
        confirmPassword: dto.repeatPassword,
        token: token,
      });
      setStatusAlert({
        message: res.message,
        isOpen: true,
      });

      navigate("/auth/login");
    }
  };
  return (
    <div className="flex h-calc-screen-lg justify-center items-center">
      <div className="w-full max-w-md">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormPartsLayout title={"Set a new password"}>
              {user ? (
                <>
                  <div className="w-full mb-4">
                    <FormField
                      name="newPassword"
                      type="password"
                      placeholder="enter a new password"
                      label="Password*"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <FormField
                      name="repeatPassword"
                      type="password"
                      placeholder="repeat a password"
                      label="Confirm Password*"
                    />
                  </div>
                  <FormButton
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    isLoading={form.formState.isSubmitting}
                    title={"set new password"}
                  />
                </>
              ) : (
                <div className="w-full flex justify-center items-center">
                  <p className="text-red-500 text-xl">Invalid token</p>
                </div>
              )}
            </FormPartsLayout>
          </form>
        </FormProvider>
      </div>
      <Snackbar
        open={statusAlert.isOpen}
        autoHideDuration={2000}
        onClose={() => setStatusAlert({ message: "", isOpen: false })}
        message={statusAlert.message}
      />
    </div>
  );
};

export default ChangePasswordPage;
