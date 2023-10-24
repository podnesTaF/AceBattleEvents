export const getProfileTabs = (isMe: boolean, userRole?: string): string[] => {
  // Viewer
  if (userRole === "spectator") {
    return isMe ? ["Calendar"] : [];
  }

  // Manager
  if (userRole === "manager") {
    if (isMe) {
      return ["Teams", "Calendar", "Last Races"];
    } else {
      return ["Teams", "Last Races"];
    }
  }

  // Runner
  if (userRole === "runner") {
    return ["Teams", "Results", "Calendar"];
  }

  // Default case
  return [];
};
