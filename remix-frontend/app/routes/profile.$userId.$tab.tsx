import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

import { Api } from "~/api/axiosInstance";

import {
  authenticator,
  transformRaceToTable,
  transformUserResultsToTable,
} from "~/lib/utils";

import {
  IClub,
  IRace,
  ITeam,
  ITeamEvent,
  IUser,
  IViewer,
  PersonalEvents,
  UserResult,
} from "~/lib/types";

import {
  ClubResultsFilter,
  CustomTable,
  MyClub,
  Pagination,
  Registrations,
  TeamCard,
} from "~/components";

type TabReturnData = {
  tab?: string;
  scrollY: string | null;
  user: IUser;
  teams?: ITeam[];
  viewerRegistrations?: IViewer[];
  teamRegistrations?: ITeamEvent[];
  favoriteClubs?: IClub[];
  club?: IClub | null;
  calendar?: PersonalEvents[];
  races?: IRace[];
  resultsData?: {
    results: UserResult[];
    totalPages: number;
    currentPage: number;
  };
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const { tab } = params;
  const { userId } = params;
  const { url } = request;

  const scrollY = new URL(url).searchParams.get("scrollY");
  const resultPage = new URL(url).searchParams.get("resultPage") || "1";

  const user = await Api().users.getUserProfile(userId || "");

  const authedUser = await authenticator.isAuthenticated(request);

  const returnData: TabReturnData = {
    tab,
    scrollY,
    user: user,
  };

  if (tab === "Teams") {
    if (user?.role === "runner") {
      const teams = await Api().teams.getTeamsByUserId(userId);
      returnData.teams = teams;
    } else {
    }
  }

  if (tab === "Last Races") {
    if (user.role === "manager" && user?.club?.id) {
      const races = await Api().clubs.getClubFinishedRaces(user.club.id);
      returnData.races = races;
    }
  }

  if (tab === "Registrations") {
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
    } else {
    }
  }

  if (tab === "Favorites") {
    if (user.role === "viewer") {
      const favorites = await Api().users.getFavoriteClubs(user.id);
      returnData.favoriteClubs = favorites;
    }
  }

  if (tab === "My club") {
    if (user.role === "manager" && user.id === authedUser?.id) {
      if (authedUser.clubId) {
        const club = await Api().clubs.getClub(authedUser.clubId.toString());
        returnData.club = club;
      } else {
        returnData.club = null;
      }
    }
  }

  if (tab === "Personal Calendar") {
    if (user.role === "runner" && user.id === authedUser?.id) {
      const personalCalendar = await Api(
        authedUser.token
      ).teams.getPersonalCalendar();

      returnData.teamRegistrations = personalCalendar;
    }
  }

  if (tab === "Results") {
    if (user.role === "runner") {
      const resultsData = await Api().users.getUserResults(
        user.id,
        +resultPage
      );
      if (resultsData) {
        returnData.resultsData = { ...resultsData, currentPage: +resultPage };
      }
    }
  }

  return json(returnData);
};

const ProfileTab = () => {
  const {
    tab,
    scrollY,
    teams,
    viewerRegistrations,
    teamRegistrations,
    user,
    favoriteClubs,
    club,
    races,
    resultsData,
  } = useLoaderData<typeof loader>();
  const [filters, setFilters] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!scrollY) return;
    window.scrollTo(0, +scrollY);
  }, [tab, scrollY, resultsData?.currentPage]);

  const getFilters = (filters: any) => {
    setFilters(filters);
  };

  const onChangeResultPage = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("resultPage", page.toString());
    url.searchParams.set("scrollY", window.scrollY.toString());
    navigate(url.pathname + url.search);
  };

  return (
    <>
      {tab === "Teams" && (
        <div className="p-4">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Your teams
          </h2>
          {teams?.length ? (
            teams?.map((team, idx) => (
              <TeamCard key={team.id} team={team} hightlightId={user.id} />
            ))
          ) : (
            <p className="text-center text-xl font-semibold">
              You don't have teams yet
              <br />
            </p>
          )}
        </div>
      )}
      {tab === "Registrations" && (
        <>
          {user.role === "viewer" && viewerRegistrations && (
            <ul>
              {viewerRegistrations.length ? (
                viewerRegistrations.map((registration) => (
                  <li key={registration.id}>
                    <p>{registration.event.title}</p>
                    <p>{registration.lastName}</p>
                  </li>
                ))
              ) : (
                <h3 className="text-2xl">No registrations yet</h3>
              )}
            </ul>
          )}
          {user.role === "manager" && teamRegistrations && (
            <Registrations registrations={teamRegistrations} />
          )}
        </>
      )}
      {tab === "Favorites" && (
        <>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Your favorite clubs
          </h2>
          {user.role === "viewer" && (
            <ul>
              {favoriteClubs?.length ? (
                favoriteClubs.map((club) => (
                  <li key={club.id}>
                    <p>{club.name}</p>
                  </li>
                ))
              ) : (
                <h3 className="text-2xl">No favorite clubs yet</h3>
              )}
            </ul>
          )}
        </>
      )}
      {tab === "My club" && (
        <>
          {club ? (
            <MyClub club={club} />
          ) : (
            <h3 className="text-2xl">You don't have a club yet</h3>
          )}
        </>
      )}
      {tab === "Personal Calendar" &&
        user.role === "runner" &&
        teamRegistrations &&
        (teamRegistrations.length ? (
          <Registrations registrations={teamRegistrations} />
        ) : (
          <h3 className="text-2xl">You don't have any registrations yet</h3>
        ))}
      {tab === "Last Races" && races && (
        <div className="px-4">
          <h2 className="text-3xl font-semibold my-4 text-center">
            Last Races
          </h2>
          <div className="mb-4">
            {races.length ? (
              <CustomTable
                rows={transformRaceToTable(races)}
                isLoading={false}
                titleColor="bg-black"
                isTitleStraight={true}
              />
            ) : (
              <p>Your club haven&quot;t finished any races yet</p>
            )}
          </div>
        </div>
      )}
      {tab === "Results" && resultsData && user.role === "runner" && (
        <div className="p-4">
          <ClubResultsFilter getFilters={getFilters} />
          <div className="w-full">
            <CustomTable
              rows={transformUserResultsToTable(resultsData.results)}
              isLoading={false}
              titleColor="bg-[#1E1C1F]"
              isTitleStraight={true}
            />
            <div className="flex w-full justify-center my-4">
              <Pagination
                onChangePage={(page) => onChangeResultPage(page)}
                currPage={resultsData.currentPage}
                pagesCount={resultsData.totalPages}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileTab;
