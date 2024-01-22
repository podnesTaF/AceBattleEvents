import { IUser } from "@lib/models";
import { useTranslation } from "react-i18next";

type AccountItem = {
  title: string;
  subtitle?: string;
  icon?: any;
  color: any;
  isDark?: boolean;
  link: any;
};

export const useAccountItems = (user?: IUser | null): AccountItem[] => {
  const { t } = useTranslation();
  if (!user) return [];
  const items: AccountItem[] = [
    {
      title: t("accountItems.myProfile.title"),
      subtitle: t("accountItems.myProfile.subtitle"),
      icon: "person",
      color: "$green500",
      isDark: true,
      link: `/(modals)/(profile)/${user.id}`,
    },
    {
      title: t("accountItems.settings.title"),
      subtitle: t("accountItems.settings.subtitle"),
      icon: "settings",
      color: "$blue500",
      isDark: true,
      link: "/(modals)/(settings)",
    },
    {
      title: t("accountItems.followings.title"),
      subtitle: t("accountItems.followings.subtitle"),
      icon: "people",
      color: "#1E1D1F",
      isDark: true,
      link: `/followings`,
    },
    {
      title: t("accountItems.membership.title"),
      subtitle: t("accountItems.membership.subtitle"),
      icon: "card-outline",
      color: "$yellow500",
      isDark: true,
      link: "/join",
    },
  ];

  if (user.role === "runner") {
    items.push({
      title: t("accountItems.calendar.title"),
      subtitle: t("accountItems.calendar.subtitle"),
      icon: "calendar",
      color: "$white",
      isDark: false,
      link: "/calendar",
    });
  } else if (user.role === "manager") {
    items.push({
      title: t("accountItems.calendar.title"),
      subtitle: t("accountItems.calendar.teamSubtitle"),
      icon: "calendar",
      color: "$white",
      isDark: false,
      link: "/calendar",
    });
    items.push({
      title: t("accountItems.teams.title"),
      subtitle: t("accountItems.teams.subtitle"),
      icon: "people",
      color: "$orange500",
      isDark: true,
      link: "/teams-setting",
    });
  } else if (user.role === "spectator") {
    items.push({
      title: t("accountItems.calendar.title"),
      subtitle: t("accountItems.calendar.subtitle"),
      icon: "calendar",
      color: "$white",
      isDark: false,
      link: "/calendar",
    });
  }

  return items;
};
