export type ITeam = {
  id: number;
  name: string;
  country: string;
  membersCount: number;
  club: string;
  coach: ICoach;
};

export type ICoach = {
  id: number;
  surname: string;
  name: string;
};
