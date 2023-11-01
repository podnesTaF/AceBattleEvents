import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);


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