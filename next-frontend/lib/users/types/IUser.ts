export enum MemberRole {
  RUNNER = "runner",
  SPECTATOR = "spectator",
}

export type IUser = {
  id: number;

  firstName: string;

  secondName: string;

  email: string;

  password?: string;

  oauthProvider?: string;

  oauthId?: string;

  genderId: number;

  gender?: any;

  dateOfBirth?: Date;

  phoneNumber?: string;

  emailVerified: boolean;

  roles: any[];

  countryId?: number;

  country?: any;

  city?: string;

  imageUrl?: string;

  avatarUrl?: string;

  newsSubscription?: boolean;

  bestResults?: any[];

  category?: any;

  pushTokens?: any[];

  runnerCoaches?: any[];

  coachRunners?: any[];

  requestsInitiated?: any[];

  coachTeams?: any[];

  runnerTeams?: any[];

  createdAt: Date;

  updatedAt: Date;

  token?: string;
};
