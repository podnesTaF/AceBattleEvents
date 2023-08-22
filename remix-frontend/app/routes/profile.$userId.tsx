import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import ProfileHeader from "~/components/profile/ProfileHeader";
import ProfileTabs from "~/components/profile/ProfileTabs";
import { authenticator } from "~/lib/auth/utils/auth.server";
import { getProfileTabs } from "~/lib/user/utils/getProfileTabs";

export const loader = async ({ params, request }: LoaderArgs) => {
  const { userId } = params;

  if (!userId) throw new Error("User not found");

  const user = await Api().users.getUserProfile(userId);

  const authorizedUser = await authenticator.isAuthenticated(request);

  if (!user) throw new Error("User not found");

  const tabs = getProfileTabs(authorizedUser?.id === user?.id, user?.role);

  return {
    user,
    isMe: authorizedUser?.id === user.id,
    currentUser: authorizedUser,
    token: authorizedUser?.token,
    tabs,
  };
};

const UserProfilePage = () => {
  const { user, isMe, token, currentUser, tabs } =
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
        <ProfileTabs user={user} currentUser={currentUser} />
      )}
    </>
  );
};

export default UserProfilePage;
