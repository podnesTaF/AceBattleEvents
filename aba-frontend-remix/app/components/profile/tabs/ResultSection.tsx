import { useLocation, useNavigate } from "@remix-run/react";
import { ClubResultsFilter, CustomTable } from "~/components";
import { IRaceRunner } from "~/lib/races/types/runnerResults";
import { IUser } from "~/lib/types";
import { isRunner, transformUserResultsToTable } from "~/lib/utils";

interface IResultsData {
  user: IUser;
  resultsData?: {
    items: IRaceRunner[];
    meta: {
      totalPages: number;
      currentPage: number;
    };
  };
}

const ResultsSection: React.FC<IResultsData> = ({ user, resultsData }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const getFilters = (filters: any) => {
    const params: string = new URLSearchParams({
      ...filters.reduce(
        (acc: any, curr: any) => ({ ...acc, [curr.type]: curr.value }),
        {}
      ),
    }).toString();
    if (pathname.includes(params)) return;
    navigate(`${location.pathname}?${params}`);
  };

  if (isRunner(user) && resultsData?.items) {
    return (
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold capitalize mb-4">
            Personal Bests
          </h3>
          {resultsData?.items ? (
            <CustomTable
              isTitleStraight={true}
              isLoading={false}
              titleColor="bg-black"
              rows={transformUserResultsToTable(resultsData.items)}
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

          {resultsData.items ? (
            <CustomTable
              isTitleStraight={true}
              isLoading={false}
              titleColor="bg-black"
              rows={transformUserResultsToTable(resultsData.items)}
            />
          ) : (
            <div className="px-4 py-6 border-red-500 border-l-2">
              <p className="text-center text-xl font-semibold">
                The runner don't have any results yet
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ResultsSection;
