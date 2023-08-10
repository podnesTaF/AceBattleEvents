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

export const getCategoryByDoB = (date?: string) => {
  if (!date) return "";
  const age = new Date().getFullYear() - new Date(date).getFullYear();
  if (age < 18) return "U18";
  if (age < 20) return "U20";
  if (age < 23) return "U23";
  return "Senior";
};

export const getAgeCategory = (dateOfBirth: string): string => {
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  if (age < 18) {
    return "U18";
  } else if (age < 20) {
    return "U20";
  } else if (age < 23) {
    return "U23";
  } else {
    return "Senior";
  }
};
