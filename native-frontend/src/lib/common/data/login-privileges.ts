export const loginPrivileges = (
  screen: "home" | "notification" | "account" | "events"
) => {
  if (screen === "home") {
    return {
      title: "Connect to ABM",
      privileges: [
        "Visit Events",
        "Become a Runner",
        "Follow Athletes",
        "Organize Teams",
      ],
    };
  } else if (screen === "notification") {
    return {
      title: "Login and Get Notified",
      privileges: [
        "News and Updates",
        "Get Reminders",
        "Registration statuses",
      ],
    };
  } else if (screen === "account") {
    return {
      title: "Access Your Personal Account",
      privileges: [
        "Manage your profile",
        "See following athletes",
        "Manage your roles",
      ],
    };
  } else if (screen === "events") {
    return {
      title: "Full Access to Events",
      privileges: ["Visit Events", "Register Athletes", "Follow Events"],
    };
  }

  return {
    title: "Connect to ABM",
    privileges: [
      "Visit Events",
      "Become a Runner",
      "Follow Athletes",
      "Organize Teams",
    ],
  };
};
