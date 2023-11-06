export type CreateRunnerDto = {
    dateOfBirth: string;
    gender: string;
    category: "professional" | "amateur";
    worldAthleticsUrl?: string;
    personalBests: {
      distanceInCm: number;
      timeInMs: number;
    }[];
    seasonBests: {
      distanceInCm: number;
      timeInMs: number;
    }[];
  };
  