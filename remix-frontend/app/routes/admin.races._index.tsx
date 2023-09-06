import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import {
  CustomTable,
  FilterSelect,
  Pagination,
  SearchField,
} from "~/components";
import { useFilter } from "~/lib/hooks";
import { countries, years } from "~/lib/shared";
import { transformForAdminRace } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const url = request.url;
  const params = url.split("?")[1];
  const currPage = new URL(url).searchParams.get("page") || "1";

  const racesData = await Api().races.getAllRaces(params);
  const tableData = transformForAdminRace(racesData.races);

  return json({
    racesData,
    currPage: parseInt(currPage),
    tableData,
  });
};

const RacesIndexPage = () => {
  const { racesData, currPage, tableData } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const onChangePage = (pageNum: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", pageNum.toString());
    navigate(url.pathname + url.search);
  };
  return (
    <>
      <div className="w-full flex flex-col gap-3 sm:flex-row justify-between items-center bg-[#1E1C1F] p-4">
        <h2 className="text-white text-3xl font-semibold">All Races</h2>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <SearchField onChangeInput={onChangeInput} value={searchValue} />
        </div>
      </div>
      <div className="my-4 lg:my-6 mx-2 lg:mx-6">
        <div className="flex gap-4 max-w-xl mb-4 flex-col sm:flex-row ">
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "country")?.value || ""}
              label="country"
              placeholder="Choose a country"
              values={Object.entries(countries)}
            />
          </div>
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "year")?.value || ""}
              label="year"
              placeholder="Choose a year"
              values={Object.entries(years)}
            />
          </div>
        </div>
        <div className="max-w-6xl mb-4">
          <CustomTable rows={tableData} isLoading={false} />
          <div className="flex mx-auto my-4">
            <Pagination
              onChangePage={onChangePage}
              currPage={currPage}
              pagesCount={racesData.totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RacesIndexPage;
