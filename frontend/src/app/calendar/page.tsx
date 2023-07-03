"use client";

import FilterBage from "@/components/events/FilterBage";
import FilterSelect from "@/components/events/FilterSelect";
import SearchField from "@/components/events/SearchField";
import CustomTable from "@/components/shared/CustomTable";
import CustomTitle from "@/components/shared/CustomTitle";
import Pagination from "@/components/shared/Pagination";
import { useFilter } from "@/hooks/useFilter";
import { useFetchEventsQuery } from "@/services/eventService";
import { countries, months, years } from "@/utils/events-filter-values";
import {
  getParamsFromFilters,
  transformIntoEventsTable,
} from "@/utils/transform-data";
import { useEffect, useState } from "react";

const CalendarPage = () => {
  const {
    filters,
    checkValue,
    searchValue,
    onChangeFilter,
    removeFilter,
    setCheckValue,
    setSearchValue,
  } = useFilter();
  const [eventsRows, setEventsRows] = useState<any>([]);
  const [pagesCount, setPageCount] = useState(1);
  const [currPage, setCurrPage] = useState<number>(1);

  const { data, isLoading, error } = useFetchEventsQuery({
    params: getParamsFromFilters(filters),
    currPage,
  });

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const changePage = (pageNum: number) => {
    setCurrPage(pageNum);
  };

  useEffect(() => {
    if (checkValue) {
      onChangeFilter("check", "past event included");
    } else {
      removeFilter("check");
    }
  }, [checkValue]);

  useEffect(() => {
    if (data) {
      setEventsRows(transformIntoEventsTable(data.events));
      setPageCount(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    console.log(eventsRows);
  }, [eventsRows]);

  return (
    <>
      <header className="w-full flex justify-center items-center h-48 sm:h-56 bg-[url('/main-intro-sm.jpg')] md:bg-[url('/main-intro.jpg')] bg-fixed bg-cover bg-no-repeat bg-top relative flex-col ">
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-0"></div>
      </header>
      <CustomTitle title={"BATTLE MILE"} subtitle="Events calendar" />
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
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "country")?.value || ""}
              label="country"
              placeholder="Choose a country"
              values={Object.entries(countries)}
            />
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "year")?.value || ""}
              label="year"
              placeholder="Choose a year"
              values={Object.entries(years)}
            />
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "month")?.value || ""}
              label="month"
              placeholder="Choose month"
              values={Object.entries(months)}
            />
            <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
              <div className="flex items-center">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={checkValue}
                  onChange={(e) => setCheckValue(e.target.checked)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Include past events
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <CustomTable rows={eventsRows} isLoading={isLoading} />
          <div className="flex justify-center">
            <Pagination
              pagesCount={pagesCount}
              onChangePage={changePage}
              currPage={currPage}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default CalendarPage;
