import React from "react";

interface CustomSelectProps {
  placeholder: string;
  values: any[];
  onChangeFilter: (type: string, value: string) => void;
  selected?: string | number;
  labelHidden?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  values,
  onChangeFilter,
  selected,
  ...props
}) => {
  return (
    <div className="relative">
      <select
        value={selected}
        id="small"
        {...props}
        onChange={(e) => {
          onChangeFilter(e.target.value, e.target.name);
        }}
        className="block w-full text-sm text-gray-900 border rounded-md p-3 outline-none bg-gray-50 focus:border-2 border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
      >
        <option value={undefined}>{placeholder}</option>
        {values.map((v, i) => (
          <option key={i} value={v[0]}>
            {v[1]}
          </option>
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
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomSelect;
