import { ISplit } from "../types";
import { msToMinutesAndSeconds } from "./transform-data";

export const getPace = (
  timeInMs: number,
  distance: number,
  firstSplit?: ISplit
) => {
  let originalTime = timeInMs;

  if (firstSplit) {
    if (firstSplit.resultInMs > 30000) {
      originalTime = timeInMs - firstSplit.resultInMs;
    }
  }
  const msPerCm = originalTime / distance;

  const msPerKm = msPerCm * 100000;

  return msToMinutesAndSeconds(msPerKm);
};

export const getMeters = (distanceInCm?: number) => {
  if (!distanceInCm) return (0).toFixed(0);
  return (distanceInCm / 100).toFixed(0);
};
