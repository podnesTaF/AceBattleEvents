import React from "react";

interface PaginationProps {
  onChangePage: (page: number) => void;
  currPage: number;
  pagesCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currPage,
  pagesCount,
}) => {
  return (
    <ul className="inline-flex items-center -space-x-px mx-auto">
      {pagesCount > 1 && (
        <li
          onClick={() => currPage > 1 && onChangePage(currPage - 1)}
          className={`block px-3 py-2 ml-0 leading-tight text-gray-500 ${
            currPage > 1
              ? "bg-white hover:bg-gray-100 hover:text-gray-700"
              : "bg-gray-300"
          } border border-gray-300 rounded-l-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          <span className="sr-only">Previous</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </li>
      )}
      {pagesCount > 1 ? (
        new Array(pagesCount).fill(pagesCount).map((_, i) => (
          <li
            onClick={() => onChangePage(i + 1)}
            key={i}
            className={`px-3 py-2 leading-tight ${
              currPage === i + 1
                ? "text-red-600 border-red-300 bg-red-100 hover:bg-red-200 hover:text-red-700"
                : "text-gray-500 border-gray-300 hover:bg-red-200 hover:text-gray-700"
            }  border  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-default`}
          >
            {i + 1}
          </li>
        ))
      ) : (
        <li
          className={`px-3 py-2 leading-tight text-red-600 border-red-300 bg-red-50 hover:bg-red-100 hover:text-red-700 border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          1
        </li>
      )}

      {pagesCount > 1 && (
        <li
          onClick={() => currPage < pagesCount && onChangePage(currPage + 1)}
          className={`block px-3 py-2 leading-tight text-gray-500 ${
            currPage < pagesCount
              ? "bg-white hover:bg-gray-100 hover:text-gray-700"
              : "bg-gray-300"
          } border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          <span className="sr-only">Next</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
