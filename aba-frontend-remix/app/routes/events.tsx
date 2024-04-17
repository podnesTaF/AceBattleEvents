import { Outlet, V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Events" }];
};

const events = () => {
  return <Outlet />;
};

export default events;
