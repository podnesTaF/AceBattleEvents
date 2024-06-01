import { useTranslation } from "react-i18next";

export const useProfileTabByUserRole = (userRole?: string): string[] => {
  const { t } = useTranslation();

  if (userRole === "manager") {
    return [t("profileTabs.bio"), t("profileTabs.teamsAndRunners")];
  }
  if (userRole === "runner") {
    return [
      t("profileTabs.bio"),
      t("profileTabs.teams"),
      t("profileTabs.results"),
      t("profileTabs.events"),
    ];
  }
  if (userRole === "spectator") {
    return [t("profileTabs.bio")];
  }
  if (userRole === "coach") {
    return [t("profileTabs.bio"), t("profileTabs.teams")];
  }

  return [];
};
