"use client";

import AddPlayerForm from "@/components/admin/AddPlayerForm";
import AdminHeader from "@/components/admin/AdminHeader";
import FilterSelect from "@/components/events/FilterSelect";
import CustomTable from "@/components/shared/CustomTable";
import Pagination from "@/components/shared/Pagination";
import { useFilter } from "@/hooks/useFilter";
import { IPlayer } from "@/models/ITeam";
import { useGetAllPlayersQuery } from "@/services/playerService";
import { genders } from "@/utils/events-filter-values";
import { getParamsFromFilters } from "@/utils/transform-data";
import { Collapse } from "@mui/material";
import { useEffect, useState } from "react";

const PlayersPage = () => {
  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const [currPage, setCurrPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [isCreatePlayerOpen, setIsCreatePlayerOpen] = useState<boolean>(false);
  const [playerToEdit, setPlayerToEdit] = useState<IPlayer>();

  const [playersRows, setPlayersRows] = useState<any>([]);

  const { data, isLoading, error } = useGetAllPlayersQuery({
    params: getParamsFromFilters(filters),
    page: currPage,
  });

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const onEdit = (id: string) => {
    const player = data?.players.find((p) => p.id === +id);
    if (player) {
      setPlayerToEdit(player);
      setIsCreatePlayerOpen(true);
    }
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
            link: player.id,
            value: "Edit",
          },
        }))
      );
    }
  }, [data]);

  return (
    <div className="w-full">
      <AdminHeader
        title="Players"
        description="All Players"
        searchValue={searchValue}
        onChangeInput={onChangeInput}
      >
        <div className="my-4 lg:my-6 mx-2 lg:mx-6">
          <button
            onClick={() => setIsCreatePlayerOpen((prev) => !prev)}
            className="rounded-md px-4 py-2 bg-red-600 text-white text-xl mb-4"
          >
            Create Player
          </button>
          <Collapse in={isCreatePlayerOpen}>
            <AddPlayerForm
              isOpen={isCreatePlayerOpen}
              onClose={() => setIsCreatePlayerOpen(false)}
              player={playerToEdit}
            />
          </Collapse>
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
            <CustomTable rows={playersRows} isLoading={false} onEdit={onEdit} />
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
