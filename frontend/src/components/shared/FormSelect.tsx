import React from "react";
import { useFormContext } from "react-hook-form";

interface FormSelectProps {
  label: string;
  placeholder: string;
  values: any[];
  onChangeFilter: (value: string) => void;
  selected?: string;
  name: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  placeholder,
  values,
  onChangeFilter,
  selected,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="my-2">
      <label
        htmlFor="small"
        className="block mb-2 text-lg lg:text-xl font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <select
          {...register(name)}
          value={selected}
          id="small"
          onChange={(e) => {
            onChangeFilter(e.target.value);
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
      {!!errors[name]?.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errors[name]?.message as any}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
