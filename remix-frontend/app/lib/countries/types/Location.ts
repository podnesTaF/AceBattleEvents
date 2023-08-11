import { ICountry } from "./Country";

export type ILocation = {
  zipCode: string;
  address: string;
  country: ICountry;
  city: string;
};
