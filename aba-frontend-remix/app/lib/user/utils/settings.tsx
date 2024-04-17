import GroupsIcon from "@mui/icons-material/Groups";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { IUser } from "../types";

export const defineSettingsTabs = (user: IUser) => {
  const tabs = [
    {
      title: "Profile data",
      icon: <PermIdentityIcon />,
      hiddenTabs: [
        {
          title: "User Data",
          link: "/user/settings/profile",
        },
      ],
      name: "profile",
    },
    {
      title: "Security",
      icon: <VpnKeyIcon />,
      hiddenTabs: [
        {
          title: "Change Password",
          link: "/user/settings/password",
        },
      ],
      name: "security",
    },
  ];

  if (user.role === "manager" && user.clubId) {
    tabs.push({
      title: "Teams",
      icon: <WorkspacesIcon />,
      hiddenTabs: [
        {
          title: "My Teams",
          link: "/user/settings/teams",
        },
      ],
      name: "teams",
    });

    tabs.push({
      title: "Club",
      icon: <GroupsIcon />,
      hiddenTabs: [
        {
          title: "My Club",
          link: "/user/settings/club",
        },
      ],
      name: "club",
    });
  }

  if (user.role === "runner") {
    tabs.push({
      title: "Club",
      icon: <GroupsIcon />,
      hiddenTabs: [
        {
          title: "My Club",
          link: "/user/settings/club",
        },
      ],
      name: "club",
    });
  }

  return tabs;
};
