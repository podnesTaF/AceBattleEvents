import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { LastMatchesSideBar, ProfileHeader } from "~/components";
import { IRace, IUser } from "~/lib/types";
import { authenticator, isRunner } from "~/lib/utils";

type UserProfileLoaderData = {
  user: IUser;
  isMe: boolean;
  currentUser: IUser | null;
  token: string;
  tabs: string[];
  matches: IRace[];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { userId } = params;

  if (!userId) throw new Response("No user id provided", { status: 404 });

  const user = await Api().users.getUserProfile(userId);

  const authorizedUser = await authenticator.isAuthenticated(request);

  if (!user) throw new Response("No user found", { status: 404 });

  let matches: IRace[] = [];

  if (isRunner(user)) {
    matches = await Api().races.getLastMatches({
      runnerId: user.id,
    });
  }

  return json({
    user,
    currentUser: authorizedUser,
    matches,
  });
};

const UserProfilePage = () => {
  const { user, currentUser, matches } = useLoaderData<
    typeof loader
  >() as unknown as UserProfileLoaderData;

  return (
    <div className="bg-[#fff9ff] min-h-[800px]">
      <ProfileHeader user={user} authedUser={currentUser} />
      <main className="px-4 w-full max-w-7xl xl:mx-auto xl:px-0 flex gap-8 pb-8">
        <div className="max-w-sm hidden xl:block">
          {matches && <LastMatchesSideBar matches={matches} />}
        </div>
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
