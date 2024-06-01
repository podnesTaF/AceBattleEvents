import React from "react";
import { useFormContext } from "react-hook-form";

interface FormSelectProps extends React.HTMLProps<HTMLDivElement> {
  label: string;
  placeholder: string;
  values: any[];
  onChangeFilter?: (value: string) => void;
  name: string;
  defaultValue?: number | string;
}

const FormSelect = ({
  label,
  name,
  placeholder,
  values,
  onChangeFilter,
  defaultValue,
  ...props
}: FormSelectProps) => {
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
    <div className="my-2" {...props}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm lg:text-md xl:text-lg font-semibold text-[#333] ml-3"
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
          className="block flex-1 bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-full  outline-none p-2.5 lg:p-4 w-full focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-gray-600/70 dark:focus:rind-gray-500 dark:focus:border-gray-500 appearance-none"
        >
          <option value={0}>{placeholder}</option>
          {values.map((v, i) => (
            <option className="capitalize" key={i} value={v[0]}>
              {v[1]}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 2xl:pr-4 pointer-events-none">
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
