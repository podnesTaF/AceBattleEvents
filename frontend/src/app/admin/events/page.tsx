"use client";

import FilterSelect from "@/components/events/FilterSelect";
import SearchField from "@/components/events/SearchField";
import CustomTable from "@/components/shared/CustomTable";
import Pagination from "@/components/shared/Pagination";
import { useFilter } from "@/hooks/useFilter";
import { useFetchEventsQuery } from "@/services/eventService";
import { countries, years } from "@/utils/events-filter-values";
import { getParamsFromFilters } from "@/utils/transform-data";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const AllEvents = () => {
  const [eventsRows, setEventsRows] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pagesCount, setPageCount] = useState(1);

  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const { data, isLoading, error } = useFetchEventsQuery({
    params: getParamsFromFilters(filters),
    currPage,
  });

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  useEffect(() => {
    if (data) {
      const eventsRowsFormatted = data.events.map((event) => ({
        title: event.title,
        country: event.location.country.name,
        date: event.startDateTime,
        "event page": {
          link: `/calendar/${event.id}`,
          value: "Event Page",
        },
        edit: {
          link: `/admin/events/${event.id}`,
          value: <EditIcon />,
        },
      }));
      setEventsRows(eventsRowsFormatted);
      setPageCount(data.totalPages);
    }
  }, [data]);
  return (
    <>
      <div className="w-full flex flex-col gap-3 sm:flex-row justify-between items-center bg-[#1E1C1F] p-4">
        <h2 className="text-white text-3xl font-semibold">All Events</h2>
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
          {isLoading ? (
            <CustomTable rows={[]} isLoading={true} />
          ) : (
            <CustomTable rows={eventsRows} isLoading={false} />
          )}
          <div className="flex mx-auto my-4">
            <Pagination
              onChangePage={setCurrPage}
              currPage={currPage}
              pagesCount={pagesCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEvents;
