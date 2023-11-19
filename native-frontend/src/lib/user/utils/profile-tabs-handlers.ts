export const getProfileTabByUserRole = (userRole?: string): string[] => {
  if (userRole === "manager") {
    return ["BIO", "Teams and Runners"];
  }
  if (userRole === "runner") {
    return ["BIO", "Teams", "Results", "Events"];
  }

  if (userRole === "spectator") {
    return ["BIO"];
  }

  return [];
};
