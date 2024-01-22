import { TFunction } from "i18next";

export const getNotificationFilters = (role?: string): string[] => {
  const filters = ["All"];
  if (role === "runner") {
    filters.push("Team");
    filters.push("Manager");
  }

  return filters;
};

export const getNotificationTabs = (
  t: TFunction<"translation", undefined>,
  role?: string
): string[] => {
  const tabs = [t("notificationPage.yourNotifications")];
  if (role === "manager") {
    tabs.push(t("notificationPage.sent"));
  }
  return tabs;
};
