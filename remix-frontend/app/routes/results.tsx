import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Api } from "~/api/axiosInstance";
import {
  CustomTable,
  CustomTitle,
  FilterBage,
  FilterSelect,
  Pagination,
  SearchField,
} from "~/components";
import { countries, years } from "~/lib/shared";
import {
  adminAuthenticator,
  authenticator,
  getNewParams,
  transformRaceToTable,
} from "~/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Results" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const { url } = request;
  const user = await authenticator.isAuthenticated(request);
  const admin = await adminAuthenticator.isAuthenticated(request);

  console.log(admin?.token);

  const params = url.split("?")[1];

  const racesData = await Api(admin?.token).races.getAllRaces(params, true);

  const page = new URL(url).searchParams.get("page");
  const scroll = new URL(url).searchParams.get("scrollY");
  const tableRows = transformRaceToTable(racesData.races);

  return json({
    tableRows,
    totalPages: racesData.totalPages,
    currPage: +(page || "1"),
    scroll,
  });
};

const ResultsPage = () => {
  const { tableRows, totalPages, currPage, scroll } =
    useLoaderData<typeof loader>();
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<{ type: string; value: any }[]>([]);

  const navigate = useNavigate();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const changePage = (pageNum: number) => {
    const params = getNewParams(pageNum, filters, scrollY);
    navigate(`${location.pathname}?${params}`);
  };

  const onChangeFilter = (filterType: string, selectedValue: string) => {
    if (selectedValue === "") {
      removeFilter(filterType);
      return;
    }
    setFilters((prev) => {
      const typeObj = prev.find((f) => f.type === filterType);
      if (!typeObj) {
        return [...prev, { type: filterType, value: selectedValue }];
      } else {
        return [
          ...prev.filter((f) => f.type !== filterType),
          { type: filterType, value: selectedValue },
        ];
      }
    });
  };

  const removeFilter = (filter: string) => {
    setSearchValue("");
    setFilters((prev) => prev.filter((f) => f.type !== filter));
  };

  useEffect(() => {
    if (scroll) {
      window.scrollTo(0, parseInt(scroll));
    }
  }, [currPage]);

  useEffect(() => {
    const params = getNewParams(currPage, filters, scrollY);
    navigate(`${location.pathname}?${params}`);
  }, [filters]);

  return (
    <>
      <header className="w-full flex justify-center items-center h-48 sm:h-56  md:bg-[url('/auth-intro.jpg')] bg-cover bg-no-repeat bg-center relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
      </header>
      <CustomTitle title={"ACE BATTLE MILE"} subtitle="Battles' Results" />
      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row w-full p-8 md:p-4 xl:p-2 my-4">
          <div className="w-full md:w-1/2 mr-0 md:mr-5 my-5 md:my-0 flex flex-col justify-center">
            <div className="mb-4">
              <SearchField onChangeInput={onChangeInput} value={searchValue} />
            </div>
            <div className="mb-4">
              <div className="border-b-[1px] border-solid border-gray-300 py-1 flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-light uppercase mr-3 py-1">
                  Filters:
                </h4>
                {filters.map((f, i) => (
                  <FilterBage
                    removeFilter={removeFilter}
                    key={i}
                    name={f.value}
                    type={f.type}
                  />
                ))}
                {!filters.length && (
                  <p className="text-lg text-gray-300">No Filters</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-wrap gap-x-2 justify-around items-center my-4">
            <div className="w-full md:w-2/5">
              <FilterSelect
                onChangeFilter={onChangeFilter}
                selected={
                  filters.find((f) => f.type === "category")?.value || ""
                }
                label="category"
                placeholder="Choose category"
                values={Object.entries(["indoor", "outdoor"])}
              />
            </div>
            <div className="w-full md:w-2/5">
              <FilterSelect
                onChangeFilter={onChangeFilter}
                selected={
                  filters.find((f) => f.type === "country")?.value || ""
                }
                label="country"
                placeholder="Choose a country"
                values={Object.entries(countries)}
              />
            </div>
            <div className="w-full md:w-2/5">
              <FilterSelect
                onChangeFilter={onChangeFilter}
                selected={filters.find((f) => f.type === "year")?.value || ""}
                label="year"
                placeholder="Choose a year"
                values={Object.entries(years)}
              />
            </div>
          </div>
        </div>
        <div className="my-4">
          <CustomTable rows={tableRows} isLoading={!tableRows} />
          <div className="flex w-full justify-center">
            <Pagination
              pagesCount={totalPages}
              onChangePage={changePage}
              currPage={currPage}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ResultsPage;
