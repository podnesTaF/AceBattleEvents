import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const useGoogleSignIn = () => {
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";

  const signInWithGoogle = async () => {
    const result = await signIn("google", {
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
    }
  };

  return { signInWithGoogle };
};
