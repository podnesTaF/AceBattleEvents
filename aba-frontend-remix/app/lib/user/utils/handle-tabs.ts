import { Api } from "~/api/axiosInstance";
import { transformRaceToTable, transformUserResultsToTable } from "~/lib/utils";
import { IUser } from "../types";

export const getTeamsData = async ({ user }: { user: IUser }) => {
  const teams = await Api().teams.getTeamsByUserId(user.id.toString());
  return { teams };
};

export const getLastRacesData = async ({ user }: { user: IUser }) => {
  if (user.role === "manager" && user?.manager?.club?.id) {
    const races = await Api().clubs.getClubFinishedRaces(user.manager.club.id);
    return { races, tableRaces: transformRaceToTable(races || []) };
  }
  return {};
};

export const handleRegistrationsTab = async ({
  user,
  authedUser,
}: {
  user: IUser;
  authedUser: IUser;
}) => {
  const returnData: any = {};

  if (user.role === "spectator") {
    const registrations = await Api(
      authedUser?.token
    ).users.getMyRegistrations();
    returnData.viewerRegistrations = registrations;
  } else if (user.role === "manager") {
    const teamRegistrations = await Api(
      authedUser?.token
    ).teams.getRegistrations({
      page: "1",
      limit: "3",
    });
    returnData.teamRegistrations = teamRegistrations?.teamsForEvents;
  } else if (user.runner) {
    const personalCalendar = await Api().teams.getPersonalCalendar(
      user.runner.id
    );
    returnData.teamRegistrations = personalCalendar;
  }

  return returnData;
};

export const handleFavoritesTab = async ({ user }: { user: IUser }) => {
  const returnData: any = {};

  if (user.role === "spectator" && user?.spectator) {
    const favorites = await Api().users.getFavoriteClubs(user.spectator.id);
    returnData.favoriteClubs = favorites;
  }

  return returnData;
};

export const handleMyClubTab = async ({
  user,
  authedUser,
}: {
  user: IUser;
  authedUser: IUser;
}) => {
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

export const handleResultsTab = async ({
  user,
  resultPage,
  resultCategory,
  resultYear,
}: {
  user: IUser;
  resultPage: number;
  resultYear?: number;
  resultCategory?: string;
}) => {
  const returnData: any = {};

  if (user.runner) {
    const resultsData = await Api().users.getUserResults({
      id: user.runner.id,
      page: +resultPage,
      resultCategory,
      resultYear,
    });
    if (resultsData) {
      returnData.resultsData = { ...resultsData, currentPage: +resultPage };
      returnData.resultsTableData = transformUserResultsToTable(
        resultsData.results
      );
    }
  }

  return returnData;
};
