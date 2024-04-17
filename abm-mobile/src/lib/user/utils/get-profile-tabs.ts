export const getProfileTabs = (userRole?: string): string[] => {
  // Viewer
  if (userRole === "spectator") {
    return ["BIO"];
  }

  // Manager
  if (userRole === "manager") {
    return ["BIO", "Teams and Runners"];
  }

  // Runner
  if (userRole === "runner") {
    return ["BIO", "Teams", "Results", "Competitions"];
  }

  return [];
};
