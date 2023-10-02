export type JoinOptions = {
  [key: number]: {
    title: string;
    name: string;
    options: {
      value: string;
      label: string;
    }[];
    extraInfo?: string;
  };
};

export const joinOptions: JoinOptions = {
  [1]: {
    title: "What is your interest in Ace Battle Mile?",
    name: "role",
    options: [
      {
        value: "runner",
        label:
          "I'm a runner, who wants to compete in future Ace Battle events!",
      },
      {
        value: "spectator",
        label:
          "I'm a running fan, who wants to stay updated with upcoming Ace Battle events!",
      },
    ],
  },
  [2]: {
    title: "What is your skill category?",
    name: "category",
    options: [
      {
        label: "I'm a professional, who competes in different competitions.",
        value: "professional",
      },
      {
        label:
          "I'm a passionate amateur, who wantst to competes in new events.",
        value: "amateur",
      },
    ],
  },
  [3]: {
    title: "Have you ever run distances like mile, 1500m or 800m?*",
    name: "distanceRunner",
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
    extraInfo: "*or other distances, which can show your running level",
  },
  [8]: {
    title: "Are you going to visit Brussels Mile on 23 of September?*",
    extraInfo: "*You will receive a ticket to the ivent on your email",
    name: "attendBrussels",
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
};
