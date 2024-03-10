import AuthApi from "@/src/entities/Auth/api/authApi";
import { registerSchema } from "@/src/entities/Auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSignUp = () => {
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSignUp(values: z.infer<typeof registerSchema>) {
    if (values.confirm !== values.password) {
      form.setError("confirm", {
        type: "manual",
        message: "Password does not match",
      });

      return;
    }

    try {
      const authApi = new AuthApi();
      const data = await authApi.register(values);

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        rememberMe: true,
        redirect: false,
        callbackUrl: "/signup/confirm-email",
      });

      if (result && !result.error && result.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      form.setError("root", {
        type: "manual",
        message:
          error?.response?.data?.message ||
          "An error occurred while registering user",
      });
    }
  }

  return { form, onSignUp };
};
