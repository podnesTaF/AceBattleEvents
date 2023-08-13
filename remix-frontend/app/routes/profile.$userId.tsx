import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import ProfileHeader from "~/components/profile/ProfileHeader";
import ProfileTabs from "~/components/profile/ProfileTabs";
import { authenticator } from "~/lib/auth/utils/auth.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { userId } = params;

  const limit = new URL(request.url).searchParams.get("limit") || "3";
  const page = new URL(request.url).searchParams.get("page") || "1";

  if (!userId) throw new Error("User not found");

  const user = await Api().users.getUserProfile(userId);

  const authorizedUser = await authenticator.isAuthenticated(request);

  if (!user) throw new Error("User not found");

  console.log(limit, page);

  const registrations = await Api(authorizedUser?.token).teams.getRegitrations({
    limit,
    page,
  });
  const teams = await Api(authorizedUser?.token).teams.getTeamByUserId();

  return {
    user,
    isMe: authorizedUser?.id === user.id,
    token: authorizedUser?.token,
    registrations,
    teams,
  };
};

const UserProfilePage = () => {
  const { user, isMe, token, registrations, teams } =
    useLoaderData<typeof loader>();

  return (
    <>
      <ProfileHeader user={user} isMe={isMe} token={token} />
      <ProfileTabs
        registrations={registrations}
        teams={teams}
        userId={user.id}
      />
    </>
  );
};

export default UserProfilePage;
