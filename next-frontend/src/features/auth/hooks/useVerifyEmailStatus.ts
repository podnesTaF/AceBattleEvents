import AuthApi from "@/src/entities/Auth/api/authApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useVerifyEmailStatus = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!session) return;

    const intervalId = setInterval(async () => {
      try {
        const authApi = new AuthApi(session);
        const isVerified = await authApi.verifyEmailStatus();
        if (isVerified) {
          clearInterval(intervalId);
          setVerified(true);
        }
      } catch (error) {
        console.error("Error verifying email status", error);
        clearInterval(intervalId);
        router.push("/signup"); // Or handle the error differently
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [router, session]);

  return { verified };
};
