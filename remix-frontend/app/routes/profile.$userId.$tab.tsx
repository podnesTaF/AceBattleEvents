import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

import { Api } from "~/api/axiosInstance";

import {
  authenticator,
  getLastRacesData,
  getTeamsData,
  handleFavoritesTab,
  handleMyClubTab,
  handlePersonalCalendarTab,
  handleRegistrationsTab,
  handleResultsTab,
} from "~/lib/utils";

import { TabReturnData } from "~/lib/types";

import {
  FavoriteClubsSection,
  LastRacesSection,
  MyClubSection,
  RegistrationsSection,
  ResultsSection,
  TeamSection,
} from "~/components";
import PersonalCalendarSection from "~/components/profile/tabs/PersonalCalendarSection";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { tab } = params;
  const { userId } = params;

  const scrollY = new URL(request.url).searchParams.get("scrollY");
  const resultPage = new URL(request.url).searchParams.get("resultPage") || "1";

  const user = await Api().users.getUserProfile(userId || "");
  const authedUser = await authenticator.isAuthenticated(request);

  const tabHandlers: any = {
    Teams: getTeamsData,
    "Last Races": getLastRacesData,
    Registrations: handleRegistrationsTab,
    Favorites: handleFavoritesTab,
    "My club": handleMyClubTab,
    "Personal Calendar": handlePersonalCalendarTab,
    Results: handleResultsTab,
  };

  const returnData: TabReturnData = {
    tab,
    scrollY,
    user,
    token: authedUser?.token,
  };

  if (tab && tabHandlers[tab]) {
    const tabData = await tabHandlers[tab](user, authedUser, resultPage);
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
    races,
    resultsData,
    token,
  } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!scrollY) return;
    window.scrollTo(0, +scrollY);
  }, [tab, scrollY, resultsData?.currentPage]);

  const onChangeResultPage = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("resultPage", page.toString());
    url.searchParams.set("scrollY", window.scrollY.toString());
    navigate(url.pathname + url.search);
  };

  return (
    <>
      {tab === "Teams" && <TeamSection teams={teams} user={user} />}
      {tab === "Registrations" && (
        <RegistrationsSection
          user={user}
          viewerRegistrations={viewerRegistrations}
          teamRegistrations={teamRegistrations}
        />
      )}
      {tab === "Favorites" && (
        <FavoriteClubsSection
          token={token}
          user={user}
          favoriteClubs={favoriteClubs}
        />
      )}
      {tab === "My club" && <MyClubSection club={club} />}
      {tab === "Personal Calendar" && (
        <PersonalCalendarSection
          user={user}
          teamRegistrations={teamRegistrations}
        />
      )}
      {tab === "Last Races" && <LastRacesSection races={races} />}
      {tab === "Results" && (
        <ResultsSection
          user={user}
          resultsData={resultsData}
          onChangeResultPage={onChangeResultPage}
        />
      )}
    </>
  );
};

export default ProfileTab;
