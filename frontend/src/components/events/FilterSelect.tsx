import React from "react";

interface FilterSelectProps {
  label: string;
  placeholder: string;
  values: any[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  placeholder,
  values,
}) => {
  return (
    <div className="w-full sm:w-2/5 md:w-full lg:w-2/5">
      <label
        htmlFor="small"
        className="block mb-2 text-sm text-gray-900 dark:text-white uppercase font-thin"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id="small"
          className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
        >
          <option selected>{placeholder}</option>
          {values.map((v, i) => (
            <option value={v[0]}>{v[1]}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.80385 1L7 10L12.1962 1H1.80385Z"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;
