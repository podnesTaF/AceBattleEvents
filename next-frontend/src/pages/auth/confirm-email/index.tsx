import {
  useSendConfirmationEmail,
  useVerifyEmailStatus,
} from "@/src/features/auth";
import Link from "next/link";
import { useEffect } from "react";

const ConfirmEmail = () => {
  const { sendConfirmationEmail } = useSendConfirmationEmail();
  const { verified } = useVerifyEmailStatus();

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

export default ConfirmEmail;
