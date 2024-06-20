import dayjs from "dayjs";
import "dayjs/locale/en";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

// Convert date string to DD.MM.YYYY format
export const formatDateToDots = (date?: string): string => {
  if (!date) return "";
  return dayjs(date).format("DD.MM.YYYY");
};

// Convert date string to DD MMM YYYY format
export const formatDateToShortMonth = (date?: string): string => {
  if (!date) return "";
  return dayjs(date).format("DD MMM YYYY");
};

// Convert date string to DD Month YYYY format
export const formatDateToFullMonth = (date: string): string => {
  return dayjs(date).format("DD MMMM YYYY");
};

// Convert datetime string to HH:mm format
export const formatTime = (datetime: string): string => {
  return dayjs(datetime).format("HH:mm");
};

// Convert datetime string to DD MMM YYYY HH:mm format
export const formatDateTimeToShortMonth = (datetime: string): string => {
  return dayjs(datetime).format("DD MMM YYYY HH:mm");
};

export const getTimeAgo = (date: string) => {
  const timeAgo = new TimeAgo("en-US");
  return timeAgo.format(new Date(date));
};
