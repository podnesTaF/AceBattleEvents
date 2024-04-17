import { Icon } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { UserIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { IUser } from "../models";

type Step = {
  id: number;
  title: string;
  description: string;
  link?: any;
  icon: JSX.Element;
  isActive?: boolean;
  isFinished?: boolean;
};

const roleModifications = {
  runner: (steps: Step[]) => {
    steps[1].description = "You are a runner";
    steps[1].isFinished = true;
    steps[1].isActive = false;
  },
  manager: (steps: Step[]) => {
    steps[3].description = "You are a team manager";
    steps[3].isFinished = true;
    steps[3].isActive = false;
  },
};

export const getMembershipSteps = (user?: IUser | null) => {
  const { t } = useTranslation();
  // Clone the static steps to avoid mutating the original array
  const joinSteps = [
    {
      id: 1,
      title: t("steps.userRegistrationTitle"),
      description: t("steps.userRegistrationDescription"),
      icon: <Icon as={UserIcon} size={"xl"} />,
      link: "/user",
      isActive: true,
      isFinished: false,
    },
    {
      id: 2,
      title: t("steps.runnerRegistrationTitle"),
      description: t("steps.runnerRegistrationDescription"),
      icon: (
        <Image
          contentFit="contain"
          contentPosition={"center"}
          style={{ height: 36, width: 36 }}
          source={require("@Assets/images/active-step.png")}
          alt={"st"}
        />
      ),
      link: "/runner",
      isActive: false,
      isFinished: false,
    },
    {
      id: 3,
      title: t("steps.coachRegistrationTitle"),
      description: t("steps.coachRegistrationDescription"),
      icon: (
        <Image
          contentFit="contain"
          contentPosition={"center"}
          style={{ height: 36, width: 36 }}
          source={require("@Assets/images/coach-icon.png")}
          alt={"coach"}
        />
      ),
      link: "/coach",
      isActive: false,
      isFinished: false,
    },
    {
      id: 4,
      title: t("steps.teamManagerRegistrationTitle"),
      description: t("steps.teamManagerRegistrationDescription"),
      icon: (
        <Image
          contentFit="contain"
          contentPosition={"center"}
          style={{ height: 36, width: 36 }}
          source={require("@Assets/images/manager-icon.png")}
          alt={"manager"}
        />
      ),
      link: "/manager",
      isActive: false,
      isFinished: false,
    },
  ];

  if (user?.role) {
    joinSteps[0].description = "You are registered as a user";
    joinSteps[0].isFinished = true;
    joinSteps[0].isActive = false;
    joinSteps[1].isActive = true;
    joinSteps[3].isActive = false;

    // Apply role-specific modifications
    const modifySteps = (roleModifications as any)[user.role];
    if (modifySteps) {
      modifySteps(joinSteps, user.rolePending);
    }
  }

  // Handle rolePending attribute
  if (user?.rolePending) {
    const pendingIndex =
      user.rolePending === "runner"
        ? 1
        : user.rolePending === "manager"
        ? 3
        : user.rolePending === "coach"
        ? 2
        : -1; // Add other roles here if needed

    if (pendingIndex !== -1) {
      joinSteps[pendingIndex].description += " (Pending)";
      joinSteps[pendingIndex].isActive = false;
      joinSteps[pendingIndex].isFinished = false;
    }
  }

  return joinSteps;
};
