"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import FilterSelect from "@/components/events/FilterSelect";
import CustomTable from "@/components/shared/CustomTable";
import Pagination from "@/components/shared/Pagination";
import { useFilter } from "@/hooks/useFilter";
import { useFetchAllTeamsQuery } from "@/services/teamService";
import { countries } from "@/utils/events-filter-values";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const TeamsPage = () => {
  const { filters, searchValue, onChangeFilter, setSearchValue } = useFilter();
  const { data, isLoading, error } = useFetchAllTeamsQuery();
  const [teamsRows, setTeamsRows] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(1);

  useEffect(() => {
    if (data) {
      const formattedTeams: any = data.map((team) => ({
        name: team.name,
        country: team.country.name,
        members: team.membersCount || 0,
        coach: team.coach.name + " " + team.coach.surname,
        "team page": {
          link: "/team/" + team.id,
          value: "details",
        },
        edit: {
          value: <EditIcon />,
          link: "/admin/teams/add/" + team.id,
        },
      }));

      setTeamsRows(formattedTeams);
    }
  }, [data]);

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

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
              selected={filters.find((f) => f.type === "country")?.value || ""}
              label="country"
              placeholder="Choose a country"
              values={Object.entries(countries)}
            />
          </div>
          <div className="max-w-6xl mb-4">
            {isLoading ? (
              <CustomTable rows={[]} isLoading={true} />
            ) : (
              <CustomTable rows={teamsRows} isLoading={false} />
            )}
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

export default TeamsPage;
