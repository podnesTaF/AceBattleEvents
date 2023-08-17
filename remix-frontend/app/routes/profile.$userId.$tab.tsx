import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { Api } from "~/api/axiosInstance";
import TeamCard from "~/components/teams/TeamCard";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { IClub } from "~/lib/clubs/types";
import { IViewer } from "~/lib/registrations/types/ViewerRegister";
import { ITeam } from "~/lib/teams/types";
import { ITeamEvent } from "~/lib/teams/types/Registrations";
import { IUser } from "~/lib/user/types/IUser";

type TabReturnData = {
  tab?: string;
  scrollY: string | null;
  user: IUser;
  teams?: ITeam[];
  viewerRegistrations?: IViewer[];
  teamRegistrations?: ITeamEvent[];
  favoriteClubs?: IClub[];
  club?: IClub | null;
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
  } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!scrollY) return;
    window.scrollTo(0, +scrollY);
  }, [tab, scrollY]);

  return (
    <>
      {tab === "Teams" && (
        <>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Your teams
          </h2>
          {teams?.length ? (
            teams?.map((team, idx) => <TeamCard key={team.id} team={team} />)
          ) : (
            <p className="text-center text-xl font-semibold">
              You don't have teams yet
              <br />
            </p>
          )}
        </>
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
            <ul>
              {teamRegistrations.map((registration, i) => (
                <li key={registration.event.id + "." + registration.team.id}>
                  <p>{registration.event.title}</p>
                  <p>{registration.team.name}</p>
                </li>
              ))}
            </ul>
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
          <h2 className="text-3xl font-semibold mb-4 text-center">Your club</h2>
          {club ? (
            <ul>
              <li key={club.id}>
                <p>{club.name}</p>
              </li>
            </ul>
          ) : (
            <h3 className="text-2xl">You don't have a club yet</h3>
          )}
        </>
      )}
    </>
  );
};

export default ProfileTab;
