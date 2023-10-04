import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { ClubResultsFilter, CustomTable, Pagination } from "~/components";
import { IUser, UserResult } from "~/lib/types";
import { getNewParams } from "~/lib/utils";

interface IResultsData {
  user: IUser;
  resultsData?: {
    results: UserResult[];
    totalPages: number;
    currentPage: number;
  };
  tableData?: any[];
  onChangeResultPage: (page: number) => void;
}

const ResultsSection: React.FC<IResultsData> = ({
  user,
  resultsData,
  tableData,
  onChangeResultPage,
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{ type: string; value: any }[]>([]);
  const getFilters = (filters: any) => {
    setFilters(filters);
    const params = getNewParams(1, filters, scrollY);
    navigate(`${location.pathname}?${params}`);
  };

  if (user.role === "runner" && resultsData) {
    return (
      <div className="p-4">
        <ClubResultsFilter getFilters={getFilters} />
        <div className="w-full">
          <CustomTable
            itemsName="results"
            rows={tableData || []}
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
