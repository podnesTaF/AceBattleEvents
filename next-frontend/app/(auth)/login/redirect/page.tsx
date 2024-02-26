"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const RedirectPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const redirectUri = searchParams?.get("redirectUri") || "/";

  useEffect(() => {
    if (session?.user.ott && redirectUri) {
      const finalUri = new URL(redirectUri);
      finalUri.searchParams.append("ott", session.user.ott as string);
      const urlWithOtt = `${redirectUri}?ott=${session.user.ott}`;

      window.location.href = urlWithOtt;
    }
  }, [session, redirectUri]);

  return <div>Redirecting you to the event site...</div>;
};

export default RedirectPage;
