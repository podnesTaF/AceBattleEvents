import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { Api } from "~/api/axiosInstance";

import {
  authenticator,
  getLastRacesData,
  getTeamsData,
  handleFavoritesTab,
  handleMyClubTab,
  handleRegistrationsTab,
  handleResultsTab,
} from "~/lib/utils";

import { TabReturnData } from "~/lib/types";

import {
  FavoriteClubsSection,
  LastRacesSection,
  MyClubSection,
  PersonalCalendarSection,
  RegistrationsSection,
  ResultsSection,
  TeamSection,
} from "~/components";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { tab } = params;
  const { userId } = params;

  const scrollY = new URL(request.url).searchParams.get("scrollY");
  const resultPage = new URL(request.url).searchParams.get("resultPage") || 1;
  const resultYear = new URL(request.url).searchParams.get("year") || "";
  const resultCategory =
    new URL(request.url).searchParams.get("category") || "";

  const user = await Api().users.getUserProfile(userId || "");
  const authedUser = await authenticator.isAuthenticated(request);

  if (!user) throw new Response("No user found", { status: 404 });

  const tabHandlers: any = {
    Teams: getTeamsData,
    "Last Races": getLastRacesData,
    Calendar: handleRegistrationsTab,
    Favorites: handleFavoritesTab,
    "My club": handleMyClubTab,
    Results: handleResultsTab,
  };

  const returnData: TabReturnData = {
    tab,
    scrollY,
    user,
    token: authedUser?.token,
    resultYear,
    resultCategory,
  };

  if (tab && tabHandlers[tab]) {
    const tabData = await tabHandlers[tab]({
      runner: user.runner,
      user,
      authedUser,
      resultPage,
      resultYear: resultYear ? +resultYear : undefined,
      resultCategory,
    });
    Object.assign(returnData, tabData);
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
    resultCategory,
    resultYear,
    tableRaces,
    resultsData,
    resultsTableData,
    token,
  } = useLoaderData<typeof loader>() as unknown as TabReturnData;

  useEffect(() => {
    if (!scrollY) return;
    window.scrollTo(0, +scrollY);
  }, [tab, resultsData?.currentPage, scrollY, resultCategory, resultYear]);

  return (
    <>
      {tab === "Teams" && <TeamSection teams={teams} user={user} />}

      {tab === "Favorites" && (
        <FavoriteClubsSection
          token={token}
          user={user}
          favoriteClubs={favoriteClubs}
        />
      )}
      {tab === "My club" && <MyClubSection club={club} />}
      {tab === "Calendar" &&
        (user.manager || user.spectator ? (
          <RegistrationsSection
            user={user}
            viewerRegistrations={viewerRegistrations}
            teamRegistrations={teamRegistrations}
          />
        ) : (
          <PersonalCalendarSection
            user={user}
            teamRegistrations={teamRegistrations}
          />
        ))}
      {tab === "Last Races" && <LastRacesSection tableData={tableRaces} />}
      {tab === "Results" && (
        <ResultsSection
          user={user}
          tableData={resultsTableData}
          resultsData={resultsData}
        />
      )}
    </>
  );
};

export default ProfileTab;
