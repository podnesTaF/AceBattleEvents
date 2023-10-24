import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import { LastMatchesSideBar, ProfileHeader, ProfileTabs } from "~/components";
import { IRace, IUser } from "~/lib/types";
import { authenticator, getProfileTabs } from "~/lib/utils";

type UserProfileLoaderData = {
  user: IUser;
  isMe: boolean;
  currentUser: IUser | null;
  token: string;
  tabs: string[];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const { userId } = params;

  if (!userId) throw new Response("No user id provided", { status: 404 });

  const user = await Api().users.getUserProfile(userId);

  const authorizedUser = await authenticator.isAuthenticated(request);

  if (!user) throw new Response("No user found", { status: 404 });

  const tabs = getProfileTabs(authorizedUser?.id === user?.id, user?.role);

  return json({
    user,
    isMe: authorizedUser?.id === user.id,
    currentUser: authorizedUser,
    token: authorizedUser?.token,
    tabs,
  });
};

const UserProfilePage = () => {
  const { user, isMe, token, currentUser, tabs } = useLoaderData<
    typeof loader
  >() as unknown as UserProfileLoaderData;
  const [lastMatches, setLastMatches] = useState<IRace[]>([]);

  useEffect(() => {
    (async () => {
      if (user.runner) {
        const matches = await Api().races.getLastMatches({
          runnerId: user.runner.id,
        });
        setLastMatches(matches);
      } else if (user.manager) {
        const matches = await Api().races.getLastMatches({
          managerId: user.manager.id,
        });
        setLastMatches(matches);
      }
    })();
  }, []);

  return (
    <div className="bg-[#fff9ff] min-h-[800px]">
      <ProfileHeader
        user={user}
        isMe={isMe}
        token={token}
        authedUser={currentUser}
      />
      <main className="px-4 w-full max-w-7xl xl:mx-auto xl:px-0 flex gap-8 pb-8">
        <div className="max-w-sm hidden xl:block">
          {(user.runner || user.manager) && (
            <LastMatchesSideBar matches={lastMatches} />
          )}
        </div>
        <div className="flex-1 w-full">
          <ProfileTabs user={user} currentUser={currentUser} />
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
