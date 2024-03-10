import { loginSchema } from "@/src/entities/Auth/validation";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

export const useSignIn = () => {
  const { data } = useSession();
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data) {
      if (redirectUri !== "/") {
        window.location.href =
          "/login/redirect?redirectUri=" + redirectUri + "&newOtt=true";
      } else {
        window.location.href = "/";
      }
    }
  }, [data, redirectUri]);

  const onSignIn = async (dto: z.infer<typeof loginSchema>) => {
    const result = await signIn("credentials", {
      email: dto.email,
      password: dto.password,
      rememberMe: dto.rememberMe,
      redirect: false,
      callbackUrl:
        redirectUri !== "/"
          ? `${
              process.env.PLATFORM_URL
            }/api/auth/callback?redirectUri=${encodeURIComponent(redirectUri)}`
          : "/",
    });

    if (result && !result.error && result.url) {
      if (redirectUri !== "/") {
        window.location.href = "/login/redirect?redirectUri=" + redirectUri;
      } else {
        window.location.href = result.url;
      }
    } else {
      let errorMessage = "An unexpected error occurred"; // Default message

      if (result?.error) {
        errorMessage = "Wrong email or password";
      }

      setErrorMessage(errorMessage);
    }
  };

  return {
    signIn: onSignIn,
    errorMessage,
  };
};
