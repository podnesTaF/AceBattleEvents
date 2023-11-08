import { IUser } from "@lib/models";

type AccountItem = {
  title: string;
  subtitle?: string;
  icon?: any;
  color: any;
  isDark?: boolean;
  link: any;
};

export const getAccountItems = (user: IUser): AccountItem[] => {
  const items: AccountItem[] = [
    {
      title: "Settings",
      subtitle: "Manage your settings",
      icon: "settings",
      color: "$blue500",
      isDark: true,
      link: "/(modals)/(settings)",
    },
    {
      title: "Followings",
      subtitle: "Your favorite runners",
      icon: "people",
      color: "#1E1D1F",
      isDark: true,
      link: `/followings`,
    },
  ];

  if (user.runner) {
    items.unshift({
      title: "My Profile",
      subtitle: "View your profile",
      icon: "person",
      color: "$green500",
      isDark: true,
      link: `/(modals)/(profile)/${user.id}`,
    });
    items.push({
      title: "My Team",
      subtitle: "View your team",
      icon: "people",
      color: "$orange500",
      isDark: true,
      link: "/teams-setting",
    });
    items.push({
      title: "Calendar",
      subtitle: "Your registrations",
      icon: "calendar",
      color: "$white",
      isDark: false,
      link: "/calendar",
    });
  } else if (user.manager) {
    items.unshift({
      title: "My Profile",
      subtitle: "View your profile",
      icon: "person",
      color: "$green500",
      isDark: true,
      link: `/(modals)/(profile)/${user.id}`,
    });
    items.push({
      title: "Calendar",
      subtitle: "Your teams' registrations",
      icon: "calendar",
      color: "$white",
      isDark: false,
      link: "/calendar",
    });
    items.push({
      title: "Teams",
      subtitle: "Teams settings",
      icon: "people",
      color: "$blue500",
      isDark: true,
      link: "/teams-setting",
    });
  } else if (user.spectator) {
    items.unshift({
      title: "My Profile",
      subtitle: "View your profile",
      icon: "person",
      color: "$green500",
      isDark: true,
      link: `/(modals)/(profile)/${user.id}`,
    });
    items.push({
      title: "Calendar",
      subtitle: "Your registrations",
      icon: "calendar",
      color: "$white",
      isDark: false,
      link: "/calendar",
    });
  }

  return items;
};
