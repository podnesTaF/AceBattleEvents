import { MetaFunction, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Ace Battle Events | Profile" }];
};

const ProfilePage = () => {
  return <Outlet />;
};

export default ProfilePage;
