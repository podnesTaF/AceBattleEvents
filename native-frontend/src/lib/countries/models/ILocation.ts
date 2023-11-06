import { ICountry } from "@lib/models";

export type ILocation = {
  zipCode: string;
  address: string;
  country: ICountry;
  city: string;
};
