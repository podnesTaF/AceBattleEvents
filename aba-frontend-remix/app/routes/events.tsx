import { MetaFunction, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Ace Battle Events | Events" }];
};

const events = () => {
  return <Outlet />;
};

export default events;
