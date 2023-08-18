export const getProfileTabs = (isMe: boolean, userRole?: string): string[] => {
  // Viewer
  if (userRole === "viewer") {
    return isMe ? ["Registrations", "Favorites"] : [];
  }

  // Manager
  if (userRole === "manager") {
    if (isMe) {
      return ["My club", "Registrations", "Last Races"];
    } else {
      return ["Last Races"];
    }
  }

  // Runner
  if (userRole === "runner") {
    return ["Teams", "Personal Calendar", "Results"];
  }

  // Default case
  return [];
};
