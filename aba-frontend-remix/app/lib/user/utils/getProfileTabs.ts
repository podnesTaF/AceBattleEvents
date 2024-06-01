import { IUserRole } from "~/lib/types";

export const getProfileTabs = (
  isMe: boolean,
  userRoles?: IUserRole[]
): string[] => {
  // Manager
  if (userRoles?.some((ur) => ur.role.name === "coach")) {
    if (isMe) {
      return ["Teams", "Calendar", "Last Races"];
    } else {
      return ["Teams", "Last Races"];
    }
  }

  // Runner
  if (userRoles?.some((ur) => ur.role.name === "runner")) {
    return ["Teams", "Results", "Calendar"];
  }

  // Default case
  return [];
};
