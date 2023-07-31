import { ILocation } from "@/models/IEvent";

export const getGoogleMapsLink = (location: ILocation) => {
  return `https://www.google.com/maps/search/?api=1&query=${location.address}+${location.city}+${location.country.name}`;
};
