import { ILocation } from "~/lib/countries/types";

export const getGoogleMapsLink = (location: ILocation) => {
  return `https://www.google.com/maps/search/?api=1&query=${location.address}+${location.city}+${location.country.name}`;
};

export const transformAddress = (location: ILocation): string => {
  return (
    location.address +
    ", " +
    location.city +
    ", " +
    location.country +
    ", " +
    location.zipCode
  );
};
