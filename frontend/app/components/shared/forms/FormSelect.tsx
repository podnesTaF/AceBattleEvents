import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormSelectProps {
  label: string;
  placeholder: string;
  values: any[];
  onChangeFilter?: (value: string) => void;
  selected?: string | number;
  name: string;
  defaultValue?: number | string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  placeholder,
  values,
  onChangeFilter,
  selected,
  defaultValue,
}) => {
  const [localSelected, setLocalSelected] = useState(selected);

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChangeFilter) {
      onChangeFilter(e.target.value);
    }
  };

  return (
    <div className="my-2">
      <label
        htmlFor={name}
        className="block mb-2 text-md lg:text-lg font-medium text-gray-900 "
      >
        {label}
      </label>
      <div className="relative">
        <select
          {...register(name)}
          id={name}
          defaultValue={defaultValue || 0}
          autoComplete="on"
          onChange={onChange}
          className="block w-full text-sm shadow-sm text-gray-900 border rounded-md  p-2.5 outline-none bg-gray-50 focus:border-[1px]  dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
        >
          <option value={0}>{placeholder}</option>
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
