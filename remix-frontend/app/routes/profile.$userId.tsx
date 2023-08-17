import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import ProfileHeader from "~/components/profile/ProfileHeader";
import ProfileTabs from "~/components/profile/ProfileTabs";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { getProfileTabs } from "~/lib/user/utils/getProfileTabs";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { userId } = params;

  const limit = new URL(request.url).searchParams.get("limit") || "3";
  const page = new URL(request.url).searchParams.get("page") || "1";

  if (!userId) throw new Error("User not found");

  const user = await Api().users.getUserProfile(userId);

  const authorizedUser = await authenticator.isAuthenticated(request);

  if (!user) throw new Error("User not found");

  const registrations = await Api(authorizedUser?.token).teams.getRegitrations({
    limit,
    page,
  });
  const teams = await Api(authorizedUser?.token).teams.getTeamsByUserId(userId);
  const tabs = getProfileTabs(authorizedUser?.id === user?.id, user?.role);

  return {
    user,
    isMe: authorizedUser?.id === user.id,
    currentUser: authorizedUser,
    token: authorizedUser?.token,
    registrations,
    teams,
    tabs,
  };
};

const UserProfilePage = () => {
  const { user, isMe, token, registrations, teams, currentUser, tabs } =
    useLoaderData<typeof loader>();

  return (
    <>
      <ProfileHeader
        user={user}
        isMe={isMe}
        token={token}
        authedUser={currentUser}
      />
      {tabs?.length !== 0 && (
        <ProfileTabs
          registrations={registrations}
          teams={teams}
          user={user}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default UserProfilePage;
