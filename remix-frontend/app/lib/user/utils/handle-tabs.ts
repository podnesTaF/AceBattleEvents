import { Api } from "~/api/axiosInstance";
import { IUser } from "../types";

export const getTeamsData = async (user: IUser) => {
  const teams = await Api().teams.getTeamsByUserId(user.id.toString());
  return { teams };
};

export const getLastRacesData = async (user: IUser) => {
  if (user.role === "manager" && user?.club?.id) {
    const races = await Api().clubs.getClubFinishedRaces(user.club.id);
    return { races };
  }
  return {};
};

export const handleRegistrationsTab = async (
  user: IUser,
  authedUser: IUser
) => {
  const returnData: any = {};

  if (user.role === "viewer") {
    const registrations = await Api(
      authedUser?.token
    ).users.getMyRegistrations();
    returnData.viewerRegistrations = registrations;
  } else if (user.role === "manager") {
    const teamRegistrations = await Api(
      authedUser?.token
    ).teams.getRegitrations({
      page: "1",
      limit: "3",
    });
    returnData.teamRegistrations = teamRegistrations?.teamsForEvents;
  }

  return returnData;
};

export const handleFavoritesTab = async (user: IUser) => {
  const returnData: any = {};

  if (user.role === "viewer") {
    const favorites = await Api().users.getFavoriteClubs(user.id);
    returnData.favoriteClubs = favorites;
  }

  return returnData;
};

export const handleMyClubTab = async (user: IUser, authedUser: IUser) => {
  const returnData: any = {};

  if (user.role === "manager" && user.id === authedUser?.id) {
    if (authedUser.clubId) {
      const club = await Api().clubs.getClub(authedUser.clubId.toString());
      returnData.club = club;
    } else {
      returnData.club = null;
    }
  }

  return returnData;
};

export const handlePersonalCalendarTab = async (
  user: IUser,
  authedUser: IUser
) => {
  const returnData: any = {};

  if (user.role === "runner" && user.id === authedUser?.id) {
    const personalCalendar = await Api(
      authedUser.token
    ).teams.getPersonalCalendar();
    returnData.teamRegistrations = personalCalendar;
  }

  return returnData;
};

export const handleResultsTab = async (user: IUser, resultPage: number) => {
  const returnData: any = {};

  if (user.role === "runner") {
    const resultsData = await Api().users.getUserResults(user.id, +resultPage);
    if (resultsData) {
      returnData.resultsData = { ...resultsData, currentPage: +resultPage };
    }
  }

  return returnData;
};
