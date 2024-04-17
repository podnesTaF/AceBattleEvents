import { Outlet, V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Profile" }];
};

const ProfilePage = () => {
  return <Outlet />;
};

export default ProfilePage;
