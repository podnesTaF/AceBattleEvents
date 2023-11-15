export interface AddEventForm {
  title: string;
  startDateTime: string;
  endDate: string;
  category: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  prizes: {
    place: number;
    amount: number;
  }[];
}

export interface RegisterTeamForm {
  team: string;
  coach: string;
}
