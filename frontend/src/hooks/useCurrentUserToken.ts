import { useSession } from "next-auth/react";

export const useCurrentUserToken = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return session.user.token;
  }

  return null;
};
