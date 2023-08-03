import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const formattedDate: string = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime: string = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};

export const isPassed = (date: string) => {
  return new Date(date).getTime() < Date.now();
};

export const getTimeAgo = (date: string) => {
  const timeAgo = new TimeAgo("en-US");
  return timeAgo.format(new Date(date));
};
