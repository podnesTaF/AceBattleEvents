import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense, useEffect } from "react";
import { Api } from "~/api/axiosInstance";
import { CustomTable, Pagination } from "~/components";
import AdminHeader from "~/components/admin/AdminHeader";
import { useFilter } from "~/lib/hooks";
import { getNewParams, transformToClubData } from "~/lib/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = request.url.split("?")[1];
  const clubsData = await Api().clubs.getClubs(params);

  return {
    clubs: transformToClubData(clubsData?.clubs),
    totalPages: clubsData?.totalPages,
  };
};

const AdminClubs = () => {
  const { clubs, totalPages } = useLoaderData<typeof loader>();
  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const navigate = useNavigate();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  useEffect(() => {
    const params = getNewParams(1, filters, scrollY);

    navigate(`${location.pathname}?${params}`);
  }, [filters]);

  return (
    <div className="w-full">
      <AdminHeader
        description="All Clubs"
        title="Clubs"
        pageName="Admin Dashboard"
        searchValue={searchValue}
        onChangeInput={onChangeInput}
      />
      <main className="w-full">
        <Suspense>
          <Await resolve={clubs}>
            {(clubs) => (
              <div className="max-w-6xl mb-4 md:mx-auto my-4">
                <CustomTable itemsName="clubs" rows={clubs} isLoading={false} />
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
