"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import FilterSelect from "@/components/events/FilterSelect";
import CustomTable from "@/components/shared/CustomTable";
import Pagination from "@/components/shared/Pagination";
import { useFilter } from "@/hooks/useFilter";
import { useGetAllPlayersQuery } from "@/services/playerService";
import { genders } from "@/utils/events-filter-values";
import { useEffect, useState } from "react";

const PlayersPage = () => {
  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const [currPage, setCurrPage] = useState<number>(1);

  const [playersRows, setPlayersRows] = useState<any>([]);

  const { data, isLoading, error } = useGetAllPlayersQuery();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  useEffect(() => {
    if (data) {
      setPlayersRows(
        data.map((player) => ({
          name: player.name,
          surname: player.surname,
          DOB: player.dateOfBirth,
          "World Athletics Page": {
            link: "https://www.worldathletics.org/athletes/",
            value: "World Athletics Page",
          },
          edit: {
            link: "/admin/players/add?id=" + player.id,
            value: "Edit",
          },
        }))
      );
    }
  }, [data]);

  return (
    <div className="w-full">
      <AdminHeader
        title="Teams"
        description="All Teams"
        searchValue={searchValue}
        onChangeInput={onChangeInput}
      >
        <div className="my-4 lg:my-6 mx-2 lg:mx-6">
          <div className="flex gap-4 max-w-xl mb-4 flex-col sm:flex-row">
            <FilterSelect
              onChangeFilter={onChangeFilter}
              selected={filters.find((f) => f.type === "gender")?.value || ""}
              label="gender"
              placeholder="Choose a gender"
              values={Object.entries(genders)}
            />
          </div>
          <div className="max-w-6xl mb-4">
            <CustomTable rows={playersRows} isLoading={false} />
            <div className="flex mx-auto my-4">
              <Pagination
                onChangePage={setCurrPage}
                currPage={currPage}
                pagesCount={1}
              />
            </div>
          </div>
        </div>
      </AdminHeader>
    </div>
  );
};

export default PlayersPage;
