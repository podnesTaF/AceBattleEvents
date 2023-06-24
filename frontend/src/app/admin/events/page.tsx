"use client";

import FilterSelect from "@/components/events/FilterSelect";
import SearchField from "@/components/events/SearchField";
import CustomTable from "@/components/shared/CustomTable";
import Pagination from "@/components/shared/Pagination";
import { useFilter } from "@/hooks/useFilter";
import { countries, years } from "@/utils/events-filter-values";
import { eventRows as initRows } from "@/utils/tables-dummy-data";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const AllEvents = () => {
  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const [eventsRows, setEventsRows] = useState<any>(
    initRows.map((row) => ({
      ...row,
      edit: {
        link: "/admin/events/edit",
        value: <EditIcon />,
      },
    }))
  );
  const [currPage, setCurrPage] = useState<number>(1);

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  return (
    <div className="w-full">
      <header className="w-full flex h-36 justify-center items-center relative bg-[url('/auth-intro.jpg')] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="flex items-center z-10">
          <h2 className="text-white text-3xl lg:text-4xl pr-2 border-r-2 border-red-500 font-semibold uppercase">
            Events
          </h2>
          <h3 className="text-white text-2xl lg:text-3xl pl-2 font-semibold uppercase">
            Admin dashboard
          </h3>
        </div>
      </header>
      <main className="w-full">
        <div className="w-full flex justify-between items-center bg-[#1E1C1F] p-4">
          <h2 className="text-white text-3xl font-semibold">All Events</h2>
          <div className="w-1/2 md:w-1/3 lg:w-1/4">
            <SearchField onChangeInput={onChangeInput} value={searchValue} />
          </div>
        </div>
        <div className="my-4 lg:my-6 mx-2 lg:mx-6">
          <div className="flex gap-4 max-w-xl mb-4">
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
          </div>
          <div className="max-w-6xl mb-4">
            <CustomTable rows={eventsRows} isLoading={false} />
            <div className="flex mx-auto my-4">
              <Pagination
                onChangePage={setCurrPage}
                currPage={currPage}
                pagesCount={1}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllEvents;
