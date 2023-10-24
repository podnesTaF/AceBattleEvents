import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ClubResultsFilter, CustomTable } from "~/components";
import { IUser, UserResult } from "~/lib/types";
import { transformUserResultsToTable } from "~/lib/utils";

interface IResultsData {
  user: IUser;
  resultsData?: {
    results: UserResult[];
    totalPages: number;
    currentPage: number;
  };
  tableData?: any[];
}

const ResultsSection: React.FC<IResultsData> = ({ user, resultsData }) => {
  const navigate = useNavigate();
  const [pbs, setPbs] = useState<UserResult[]>([]);

  useEffect(() => {
    if (!resultsData) return;
    setPbs(resultsData.results.filter((result) => result.pbForRunner_id));
  }, []);

  const getFilters = (filters: any) => {
    const params: string = new URLSearchParams({
      scrollY: scrollY.toString(),
      ...filters.reduce(
        (acc: any, curr: any) => ({ ...acc, [curr.type]: curr.value }),
        {}
      ),
    }).toString();
    navigate(`${location.pathname}?${params}`);
  };

  if (user.runner && resultsData) {
    return (
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold capitalize mb-4">
            Personal Bests
          </h3>
          {user.runner.personalBests?.length ? (
            <CustomTable
              isTitleStraight={true}
              isLoading={false}
              titleColor="bg-black"
              rows={transformUserResultsToTable(pbs)}
            />
          ) : (
            <div className="px-4 py-6 border-red-500 border-l-2">
              <p className="text-center text-xl font-semibold">
                The runner don't have personal bests yet
              </p>
            </div>
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold capitalize mb-6">
            All Results
          </h3>
          <ClubResultsFilter getFilters={getFilters} />
          <CustomTable
            isTitleStraight={true}
            isLoading={false}
            titleColor="bg-black"
            rows={transformUserResultsToTable(resultsData.results)}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ResultsSection;
