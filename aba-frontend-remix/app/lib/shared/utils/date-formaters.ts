import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export const formatDate = (
  dateString?: string,
  fullform: boolean = true
): string => {
  if (!dateString) return "";

  //2023-09-23T16:00:00.000Z

  const date = new Date(Date.parse(dateString));
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const formattedDate: string = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  const formattedTime: string = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${formattedDate}${fullform ? ", " + formattedTime : ""}`;
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

export function convertDateFormat(inputDate: string) {
  // Convert the input string to a Date object
  const dateObject = new Date(inputDate);

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract day and month information
  const day = dateObject.getDate();
  const month = monthNames[dateObject.getMonth()];

  // Generate the desired format
  const outputFormat = `${day} of ${month}`;

  return outputFormat;
}

export function formatEventDateRange(
  startDate: string,
  endDate: string,
  fullform: boolean = false
) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const month = start.toLocaleString("en-US", { month: "long" });
  const year = start.getFullYear();

  if (start.getUTCDate() === end.getUTCDate()) {
    return `${start.getDate()} ${month} ${year}`;
  } else if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.getUTCDate()} - ${end.getUTCDate()} ${month} ${year}`;
  } else {
    const endMonth = end.toLocaleString("en-US", { month: "long" });
    const endYear = end.getFullYear();
    return `${start.getUTCDate()} ${month} ${year} - ${end.getUTCDate()} ${endMonth} ${endYear}${
      fullform
        ? ", " +
          start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        : ""
    }`;
  }
}

export const formatTo24HourTime = (dateString?: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
