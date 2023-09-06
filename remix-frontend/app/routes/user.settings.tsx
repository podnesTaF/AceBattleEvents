import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SideBar } from "~/components";
import { authenticator, defineSettingsTabs } from "~/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Settings" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return json({ user });
};

const SettingsPage = () => {
  const { user } = useLoaderData<typeof loader>();
  const [tabs, setTabs] = useState<any[]>([]);
  ``;
  useEffect(() => {
    setTabs(defineSettingsTabs(user));
  }, [user]);

  return (
    <div className="flex w-full min-h-screen relative">
      <SideBar tabs={tabs || []} title={"Settings"} />
      <Outlet />
    </div>
  );
};

export default SettingsPage;
