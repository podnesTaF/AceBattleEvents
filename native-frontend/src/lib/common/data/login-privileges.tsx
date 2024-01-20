export const loginPrivileges = (
  screen: "home" | "notification" | "account" | "events",
  t: any
) => {
  if (screen === "home") {
    return {
      title: t("authCta.connectToAbm"),
      privileges: [
        t("authCta.privileges.visitEvents"),
        t("authCta.privileges.becomeARunner"),
        t("authCta.privileges.followAthletes"),
        t("authCta.privileges.organizeTeams"),
      ],
    };
  } else if (screen === "notification") {
    return {
      title: t("authCta.loginAndGetNotified"),
      privileges: [
        t("authCta.privileges.newsAndUpdates"),
        t("authCta.privileges.getReminders"),
        t("authCta.privileges.registrationStatuses"),
      ],
    };
  } else if (screen === "account") {
    return {
      title: t("authCta.accessYourPersonalAccount"),
      privileges: [
        t("authCta.privileges.manageYourProfile"),
        t("authCta.privileges.seeFollowingAthletes"),
        t("authCta.privileges.manageYourRoles"),
      ],
    };
  } else if (screen === "events") {
    return {
      title: t("authCta.fullAccessToEvents"),
      privileges: [
        t("authCta.privileges.visitEvents"),
        t("authCta.privileges.registerAthletes"),
        t("authCta.privileges.followEvents"),
      ],
    };
  }

  return {
    title: t("authCta.connectToAbm"),
    privileges: [
      t("authCta.privileges.visitEvents"),
      t("authCta.privileges.becomeARunner"),
      t("authCta.privileges.followAthletes"),
      t("authCta.privileges.organizeTeams"),
    ],
  };
};
