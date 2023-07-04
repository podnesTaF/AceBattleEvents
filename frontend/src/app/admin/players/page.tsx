"use client";

import AddPlayerForm from "@/components/admin/AddPlayerForm";
import AdminHeader from "@/components/admin/AdminHeader";
import FilterSelect from "@/components/events/FilterSelect";
import CustomTable from "@/components/shared/CustomTable";
import Pagination from "@/components/shared/Pagination";
import { useFilter } from "@/hooks/useFilter";
import { useGetAllPlayersQuery } from "@/services/playerService";
import { genders } from "@/utils/events-filter-values";
import { getParamsFromFilters } from "@/utils/transform-data";
import { useEffect, useState } from "react";

const PlayersPage = () => {
  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const [currPage, setCurrPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [playersRows, setPlayersRows] = useState<any>([]);

  const { data, isLoading, error } = useGetAllPlayersQuery({
    params: getParamsFromFilters(filters),
    page: currPage,
  });

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  useEffect(() => {
    if (data) {
      setPagesCount(data.totalPages);
      setPlayersRows(
        data.players.map((player) => ({
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
          <AddPlayerForm isOpen={true} onClose={() => setIsOpen(false)} />
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
                pagesCount={pagesCount}
              />
            </div>
          </div>
        </div>
      </AdminHeader>
    </div>
  );
};

export default PlayersPage;
