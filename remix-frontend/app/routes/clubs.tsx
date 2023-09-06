import { Outlet, V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Clubs" }];
};

const ClubsPageLayout = () => {
  return <Outlet />;
};

export default ClubsPageLayout;
