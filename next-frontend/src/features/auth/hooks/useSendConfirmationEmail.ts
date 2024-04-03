import AuthApi from "@/src/entities/Auth/api/authApi";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

export const useSendConfirmationEmail = () => {
  const { data: session } = useSession();
  const [emailSent, setEmailSent] = useState(false);

  const sendConfirmationEmail = useCallback(async () => {
    if (emailSent || !session) return;
    try {
      const authApi = new AuthApi(session);
      await authApi.sendConfirmationEmail(session.user.token);
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  }, [emailSent, session]);

  return { sendConfirmationEmail, emailSent };
};
