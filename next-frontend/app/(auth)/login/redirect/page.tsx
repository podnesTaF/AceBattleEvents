"use client";

import { Api } from "@/api/axiosInstance";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const RedirectPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";
  const generateNewOtt = searchParams?.get("newOtt") === "true";

  const handleRegirectAsync = useCallback(async () => {
    if (session?.user && redirectUri) {
      const finalUri = new URL(redirectUri);
      let ott;

      // if user doesn't have a valid ott, generate a new one
      if (generateNewOtt) {
        try {
          const newOtt = await Api(session).users.generateNewOtt(
            session.user.token
          );
          ott = newOtt.ott;
        } catch (error: any) {
          setErrorMessage(
            error?.response?.data?.message || "An error occurred"
          );
          return;
        }
      } else {
        ott = session.user.ott;
      }
      finalUri.searchParams.append("ott", ott as string);
      const urlWithOtt = `${redirectUri}?ott=${ott}`;

      window.location.href = urlWithOtt;
    }
  }, [session, redirectUri, generateNewOtt]);

  useEffect(() => {
    handleRegirectAsync();
  }, [handleRegirectAsync]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-color-primary text-center">
        Redirecting...
      </h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default RedirectPage;
