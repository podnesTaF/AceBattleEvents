import { Icon } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { UserIcon } from "lucide-react-native";
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

const staticSteps: Step[] = [
  {
    id: 1,
    title: "User Registration",
    description:
      "Become a user of ace battle mile. Keep updated and visit our events",
    icon: <Icon as={UserIcon} size={"xl"} />,
    link: "/user",
    isActive: true,
  },
  {
    id: 2,
    title: "Runner Registration",
    link: "/runner",
    description: "Be able to participate in future Ace Battle Events.",
    icon: (
      <Image
        contentFit="contain"
        contentPosition={"center"}
        style={{ height: 36, width: 36 }}
        source={require("@Assets/images/active-step.png")}
        alt={"st"}
      />
    ),
  },
  {
    id: 3,
    title: "Become a Coach",
    link: "/coach",
    description: "Register as a coach and be able to coach a team",
    icon: (
      <Image
        contentFit="contain"
        contentPosition={"center"}
        style={{ height: 36, width: 36 }}
        source={require("@Assets/images/coach-icon.png")}
        alt={"coach"}
      />
    ),
    isActive: false,
  },
  {
    id: 4,
    title: "Become a Team Manager",
    link: "/manager",
    description: "Manage and create your own Ace Battle Teams",
    icon: (
      <Image
        contentFit="contain"
        contentPosition={"center"}
        style={{ height: 36, width: 36 }}
        source={require("@Assets/images/manager-icon.png")}
        alt={"st"}
      />
    ),
    isActive: false,
  },
];

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
  // Clone the static steps to avoid mutating the original array
  const joinSteps = staticSteps.map((step) => ({
    ...step,
    isActive: step.isActive,
    isFinished: step.isFinished,
  }));

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
