export const getProfileTabs = (isMe: boolean, userRole?: string): string[] => {
  // Viewer
  if (userRole === "viewer") {
    return isMe ? ["Registrations", "Favorites"] : [];
  }

  // Manager
  if (userRole === "manager") {
    if (isMe) {
      return ["My club", "Registers", "Last Races"];
    } else {
      return ["Last Races", ];
    }
  }

  // Runner
  if (userRole === "runner") {
    return ["Teams", "Last Races", "All results"];
  }

  // Default case
  return [];
};
