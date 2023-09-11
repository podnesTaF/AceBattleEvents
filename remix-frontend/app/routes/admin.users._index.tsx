import { Collapse } from "@mui/material";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Api } from "~/api/axiosInstance";
import { CreateAdminForm, CustomTable } from "~/components";
import { adminAuthenticator } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const me = await adminAuthenticator.isAuthenticated(request);

  const admins = await Api(me?.token).admin.getAdmins();

  const adminsTableRows = admins.map((admin) => ({
    name: admin.name,
    surname: admin.surname,
    email: admin.email,
  }));

  return { admins, adminsTableRows, me };
};

const AdminUsers = () => {
  const { admins, adminsTableRows, me } = useLoaderData<typeof loader>();
  const [adminFormOpen, setAdminFormOpen] = useState(false);

  return (
    <div className="w-full">
      <header className="w-full flex h-36 justify-center items-center relative bg-[url('/auth-intro.jpg')] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="flex items-center z-10">
          <h2 className="text-white text-3xl lg:text-4xl pr-2 border-r-2 border-red-500 font-semibold uppercase">
            Admins
          </h2>
          <h3 className="text-white text-2xl lg:text-3xl pl-2 font-semibold uppercase">
            Admin dashboard
          </h3>
        </div>
      </header>
      <main className="w-full lg:max-w-6xl mx-4 lg:mx-auto my-6">
        <div className="mb-4">
          <button
            onClick={() => setAdminFormOpen((prev) => !prev)}
            className="w-[200px] text-center text-white bg-green-500 hover:bg-green-400 font-semibold py-2 rounded-md"
          >
            Add new admin
          </button>
          <Collapse in={adminFormOpen}>
            <CreateAdminForm me={me} />
          </Collapse>
        </div>
        <div>
          <CustomTable
            titleColor="bg-black"
            isTitleStraight={true}
            hightlightIdx={admins.findIndex((a) => a.id === me?.id)}
            rows={adminsTableRows}
            isLoading={false}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
