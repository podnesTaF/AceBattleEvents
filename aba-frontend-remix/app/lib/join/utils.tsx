export const getJoinSteps = (): {
  label: string;
  subtitle?: string;
  fieldsToValidate?: any;
  remark?: string;
}[] => {
  return [
    {
      label: "Personal Information",
      subtitle: "Please provide us some information about you",
      fieldsToValidate: [
        "lastName",
        "firstName",
        "countryId",
        "city",
        "genderId",
        "dateOfBirth",
      ],
    },
    {
      label: "Choose Role",
      subtitle: "Choose your roles",
      remark: "You can choose multiple memberships",
      fieldsToValidate: ["role"],
    },
    {
      label: "Runner Information",
      subtitle:
        "Please Provide some information about your running achievements",
      fieldsToValidate: ["category", "personalBests", "seasonBests"],
    },
    {
      label: "Login Information",
      subtitle: "Please provide your login information",
      fieldsToValidate: ["email", "password", "confirmPassword"],
    },
    {
      label: "Confirm your email address",
      subtitle: "Please confirm your email address",
      fieldsToValidate: ["emailConfirmed"],
    },
    {
      label: "Check Your Details",
      subtitle: "Please check your details",
      fieldsToValidate: ["acceptTerms"],
    },
    {
      label: "Payment Status",
    },
  ];
};

export const getRoles = (): {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
}[] => {
  return [
    {
      id: 1,
      name: "runner",
      imageUrl: "/running-black.svg",
      description:
        "I'm a runner, who wants to compete in future Ace Battle events!",
    },
    {
      id: 2,
      name: "coach",
      imageUrl: "/images/coach.png",
      description:
        "I'm a coach, who wants to help runners to achieve their goals!",
    },
  ];
};

export const convertPersonalResultToStr = (
  result: {
    distanceId: number;
    result: string;
  },
  distances: {
    id: number;
    name: string;
  }[]
): string | undefined => {
  const distanceName = distances.find((d) => d.id === +result.distanceId)?.name;

  if (!distanceName) {
    return;
  }

  return `${distanceName}: ${result.result}`;
};
