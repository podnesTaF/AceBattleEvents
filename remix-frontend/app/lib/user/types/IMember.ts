export type CreateMemberDto = {
  role: string;
  category: string;

  name: string;

  surname: string;

  email: string;

  city: string;

  country: string;

  gender: string;

  dateOfBirth?: string;

  ageRage?: string;

  interest?: string;

  attendBrussels: boolean;

  acceptTerms: boolean;

  acceptNews?: boolean;
  personalBests: BestResult[];
  seasonBests: BestResult[];
};

export type BestResult = {
  distanceInCm: number;
  timeInMs: number;
};

export type JoinFormValues = {
  role: string;
  category: string;

  name: string;

  surname: string;

  email: string;

  city: string;

  country: string;

  gender: string;

  dateOfBirth?: string;

  ageRange?: string;

  interest: string;

  attendBrussels: boolean;

  acceptTerms: boolean;

  acceptNews: boolean;

  personalBests: {
    distanceInCm: number;
    result: string;
  }[];

  seasonBests: {
    distanceInCm: number;
    result: string;
  }[];
};
