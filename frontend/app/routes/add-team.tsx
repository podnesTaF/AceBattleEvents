import { Outlet, V2_MetaFunction } from "@remix-run/react";
import { CreatePagesTitle } from "~/components";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Add Team" }];
};

const AddTeamPage = () => {
  return (
    <>
      <CreatePagesTitle title="Add Team" />
      <main className="mx-auto my-5 sm:my-8 max-w-5xl">
        <Outlet />
      </main>
    </>
  );
};

export default AddTeamPage;
