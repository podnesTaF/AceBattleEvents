export const getNotificationFilters = (role?: string): string[] => {
  const filters = ["All"];
  if (role === "runner") {
    filters.push("Team");
    filters.push("Manager");
  }

  return filters;
};

export const getNotificationTabs = (role?: string): string[] => {
  const tabs = ["Your Notifications"];
  if (role === "manager") {
    tabs.push("Sent");
  }
  return tabs;
};
