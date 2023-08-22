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
    if (isMe) {
      return ["Teams", "Personal Calendar", "Results"];
    }
    return ["Teams", "Results"];
  }

  // Default case
  return [];
};
