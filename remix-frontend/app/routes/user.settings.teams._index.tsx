import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { TeamCard } from "~/components";
import { authenticator } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user || user.role !== "manager") {
    throw new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  const teams = await Api(user.token).teams.getTeamByCurrentUserId();

  return json({ teams, user });
};

const UserSettingTeamsIndex = () => {
  const { user, teams } = useLoaderData<typeof loader>();
  return (
    <div className="w-full md:max-w-6xl px-4 xl:mx-auto">
      <h4 className="text-3xl font-semibold my-4">Your teams</h4>
      <div className="flex flex-col gap-4 mb-8">
        {teams?.map((team) => (
          <TeamCard editable={true} key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default UserSettingTeamsIndex;
