import { LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Api } from "~/api/axiosInstance";
import { CustomTable, Pagination } from "~/components";
import { transformToClubData } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const clubsData = await Api().clubs.getClubs();

  return {
    clubs: transformToClubData(clubsData?.clubs),
    totalPages: clubsData?.totalPages,
  };
};

const AdminClubs = () => {
  const { clubs, totalPages } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <header className="w-full flex h-36 justify-center items-center relative bg-[url('/auth-intro.jpg')] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="flex items-center z-10">
          <h2 className="text-white text-3xl lg:text-4xl pr-2 border-r-2 border-red-500 font-semibold uppercase">
            Clubs
          </h2>
          <h3 className="text-white text-2xl lg:text-3xl pl-2 font-semibold uppercase">
            Admin dashboard
          </h3>
        </div>
      </header>
      <main className="w-full">
        <Suspense>
          <Await resolve={clubs}>
            {(clubs) => (
              <div className="max-w-6xl mb-4 md:mx-auto my-4">
                <CustomTable rows={clubs} isLoading={false} />
                <div className="flex mx-auto my-4">
                  <Pagination
                    onChangePage={() => {}}
                    currPage={1}
                    pagesCount={totalPages || 1}
                  />
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </main>
    </div>
  );
};

export default AdminClubs;
