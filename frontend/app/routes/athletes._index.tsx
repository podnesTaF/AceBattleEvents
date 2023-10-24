import { useEffect } from "react";

import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { Pagination } from "@mui/material";
import { Api } from "~/api/axiosInstance";
import {
  FilterBage,
  FilterSelect,
  MemberCarouseltem,
  SearchField,
} from "~/components";
import { countries, useFilter } from "~/lib/shared";
import { genders } from "~/lib/teams";
import { getNewParams } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const url = request.url;
  const scrollY = new URL(url).searchParams.get("scrollY");
  const params = url.split("?")[1];
  const athletesData = await Api().athletes.getAthletes(params);
  const teamsPreview = await Api().teams.getPreviewTeams();

  let page = new URL(url).searchParams.get("page") || "1";

  if (isNaN(parseInt(page))) {
    page = "1";
  }

  return json({
    athletesData,
    teamsPreview,
    currPage: +page,
    scroll: scrollY,
  });
};

const AthletesIndexPage = () => {
  const { athletesData, teamsPreview, scroll, currPage } =
    useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const {
    filters,
    checkValue,
    searchValue,
    onChangeFilter,
    removeFilter,
    setSearchValue,
  } = useFilter();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const changePage = (pageNum: number) => {
    const params = getNewParams(pageNum, filters, scrollY);
    navigate(`${location.pathname}?${params}`);
  };

  useEffect(() => {
    if (scroll) {
      window.scrollTo(0, parseInt(scroll));
    }
  }, [currPage]);

  useEffect(() => {
    const params = getNewParams(1, filters, scrollY);
    navigate(`${location.pathname}?${params}`);
  }, [filters]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row w-full p-8 md:p-4 xl:p-2 my-4">
        <div className="w-full md:w-1/2 mr-0 md:mr-5 my-2 md:my-0 flex flex-col justify-center">
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
          <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "team")?.value || ""}
              label="team"
              placeholder="Choose a team"
              values={teamsPreview.map((t) => [t.name, t.name])}
            />
          </div>
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
              selected={filters.find((f) => f.type === "gender")?.value || ""}
              label="gender"
              placeholder="Choose gender"
              values={Object.entries(genders)}
            />
          </div>
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-wrap px-4 xl:px-8 my-4 gap-8 justify-center">
          {athletesData.athletes.map((player) => (
            <MemberCarouseltem key={player.id} item={player} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          count={athletesData.totalPages}
          onChange={(e, page) => changePage(page)}
          page={currPage}
          variant="outlined"
        />
      </div>
    </>
  );
};

export default AthletesIndexPage;
