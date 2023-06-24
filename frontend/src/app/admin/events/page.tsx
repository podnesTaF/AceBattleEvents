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
    <>
      <div className="w-full flex flex-col gap-3 sm:flex-row justify-between items-center bg-[#1E1C1F] p-4">
        <h2 className="text-white text-3xl font-semibold">All Events</h2>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <SearchField onChangeInput={onChangeInput} value={searchValue} />
        </div>
      </div>
      <div className="my-4 lg:my-6 mx-2 lg:mx-6">
        <div className="flex gap-4 max-w-xl mb-4 flex-col sm:flex-row">
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
    </>
  );
};

export default AllEvents;
