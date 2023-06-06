export type IEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  price: number;
  teamsCount?: number;
  location: ILocation;
};

export type ILocation = {
  latitude: string;
  longitude: string;
  country: string;
  city: string;
};
