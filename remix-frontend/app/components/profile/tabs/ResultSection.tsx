import { useState } from "react";
import { ClubResultsFilter, CustomTable, Pagination } from "~/components";
import { IUser, UserResult } from "~/lib/types";
import { transformUserResultsToTable } from "~/lib/utils";

interface IResultsData {
  user: IUser;
  resultsData?: {
    results: UserResult[];
    totalPages: number;
    currentPage: number;
  };
  onChangeResultPage: (page: number) => void;
}

const ResultsSection: React.FC<IResultsData> = ({
  user,
  resultsData,
  onChangeResultPage,
}) => {
  const [filters, setFilters] = useState();
  const getFilters = (filters: any) => {
    setFilters(filters);
  };
  if (user.role === "runner" && resultsData) {
    return (
      <div className="p-4">
        <ClubResultsFilter getFilters={getFilters} />
        <div className="w-full">
          <CustomTable
            rows={transformUserResultsToTable(resultsData.results)}
            isLoading={false}
            titleColor="bg-[#1E1C1F]"
            isTitleStraight={true}
          />
          <div className="flex w-full justify-center my-4">
            <Pagination
              onChangePage={(page) => onChangeResultPage(page)}
              currPage={resultsData.currentPage}
              pagesCount={resultsData.totalPages}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ResultsSection;
