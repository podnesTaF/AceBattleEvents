import { LoaderArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import AdminHeader from "~/components/admin/AdminHeader";
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

const UserTeamsPreferences = () => {
  const { user, teams } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <AdminHeader pageName="Settings" title="Teams" description="Settings" />
      <Outlet />
    </div>
  );
};

export default UserTeamsPreferences;
