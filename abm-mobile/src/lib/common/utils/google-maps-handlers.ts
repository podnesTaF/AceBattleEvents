import { ILocation } from "@lib/models";

export const getGoogleMapsLink = (location: ILocation) => {
  return `https://www.google.com/maps/search/?api=1&query=${location.address}+${
    location.city
  }+${location.country?.name || location.country}`;
};

export const transformAddress = (location: ILocation): string => {
  return (
    location.address +
    ", " +
    location.city +
    ", " +
    location.country.name +
    ", " +
    location.zipCode
  );
};
