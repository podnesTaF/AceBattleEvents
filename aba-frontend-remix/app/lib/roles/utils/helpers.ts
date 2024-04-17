import { AuthenticatedUser, IUser } from "~/lib/types";

export const isRunner = (user?: AuthenticatedUser | IUser) => {
  return user?.roles?.some(
    (ur: any) => ur.role?.name === "runner" || ur.name === "runner"
  );
};
