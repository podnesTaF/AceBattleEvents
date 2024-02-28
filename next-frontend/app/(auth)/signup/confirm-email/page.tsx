"use client";

import { Api } from "@/api/axiosInstance";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ConfirmEmailPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [verified, setVerified] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  const sendConfirmationEmail = useCallback(async () => {
    if (emailSent || !session) return;
    await Api(session).users.sendConfirmationEmail(session.user.token);
    setEmailSent(true);
  }, [session, emailSent]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const isVerified = await Api(session).users.verifyEmailStatus();
        if (isVerified) {
          clearInterval(intervalId);
          setVerified(true);
        }
      } catch (error) {
        console.error("Error verifying email status", error);
        router.push("/signup");
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [router, session]);

  useEffect(() => {
    sendConfirmationEmail();
  }, [sendConfirmationEmail]);

  return (
    <div className="flex flex-col items-center gap-5">
      {verified ? (
        <>
          <p className="text-green-500 mb-4">
            Email has been verified successfully
          </p>
          <Link href="/">Home</Link>
        </>
      ) : (
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-color-primary text-center">
          Confirm you email address.
        </h2>
      )}
    </div>
  );
};

export default ConfirmEmailPage;
