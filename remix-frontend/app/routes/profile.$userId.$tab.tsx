import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import ClubResultsFilter from "~/components/clubs/ClubResultsFilter";
import MyClub from "~/components/profile/MyClub";
import Registrations from "~/components/profile/Registrations";
import CustomTable from "~/components/shared/tables/CustomTable";
import TeamCard from "~/components/teams/TeamCard";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { IClub } from "~/lib/clubs/types";
import { IRace } from "~/lib/races/types";
import { UserResult } from "~/lib/races/types/userResult";
import { transformRaceToTable } from "~/lib/races/utils/transform-data";
import { IViewer } from "~/lib/registrations/types/ViewerRegister";
import { ITeam } from "~/lib/teams/types";
import { ITeamEvent } from "~/lib/teams/types/Registrations";
import { IUser } from "~/lib/user/types/IUser";
import { PersonalEvents } from "~/lib/user/types/PersonalCalendar";
import { transformUserResultsToTable } from "~/lib/user/utils/transformIntoTable";

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
  results?: UserResult[];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const { tab } = params;
  const { userId } = params;
  const { url } = request;

  const scrollY = new URL(url).searchParams.get("scrollY");

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
      const results = await Api().users.getUserResults(user.id);
      returnData.results = results;
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
    results,
  } = useLoaderData<typeof loader>();
  const [filters, setFilters] = useState();

  useEffect(() => {
    if (!scrollY) return;
    window.scrollTo(0, +scrollY);
  }, [tab, scrollY]);

  const getFilters = (filters: any) => {
    setFilters(filters);
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
      {tab === "Results" && results && user.role === "runner" && (
        <div className="p-4">
          <ClubResultsFilter getFilters={getFilters} />
          <div className="w-full">
            <CustomTable
              rows={transformUserResultsToTable(results)}
              isLoading={false}
              titleColor="bg-[#1E1C1F]"
              isTitleStraight={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileTab;
