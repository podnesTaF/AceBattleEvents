import { IMedia } from "~/lib/types";
import { ICountry } from "./Country";

export type ILocation = {
  zipCode: string;
  address: string;
  country: ICountry;
  city: string;
  stadium?: string;
  placeImage?: IMedia;
  placeDescription?: string;
};
