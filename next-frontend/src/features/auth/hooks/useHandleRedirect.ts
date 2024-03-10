import AuthApi from "@/src/entities/Auth/api/authApi";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useHandleRedirect = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";
  const generateNewOtt = searchParams?.get("newOtt") === "true";

  const handleRedirectAsync = useCallback(async () => {
    if (!session?.user || !redirectUri) return;

    try {
      let ott = session.user.ott;

      if (generateNewOtt) {
        const authApi = new AuthApi(session);
        const response = await authApi.generateNewOtt(session.user.token);
        ott = response.ott;
      }

      const finalUri = `${redirectUri}?ott=${ott}`;
      window.location.href = finalUri;
    } catch (error: any) {
      console.error("Error during redirection:", error);
      setErrorMessage(
        error?.response?.data?.message || "An error occurred during redirection"
      );
    }
  }, [session, redirectUri, generateNewOtt]);

  useEffect(() => {
    handleRedirectAsync();
  }, [handleRedirectAsync]);

  return { errorMessage };
};
