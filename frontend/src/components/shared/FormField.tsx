import React from "react";
import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  mask?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type,
  mask,
}) => {
  const { register, formState } = useFormContext();

  return (
    <div className="my-2">
      <label
        htmlFor={name}
        className="block mb-2 text-lg lg:text-xl font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      {mask ? (
        <InputMask
          mask={mask}
          type={type || "text"}
          {...register(name)}
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type || "text"}
          {...register(name)}
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          placeholder={placeholder}
        />
      )}
      {!!formState.errors[name]?.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {formState.errors[name]?.message as any}
        </p>
      )}
    </div>
  );
};

export default FormField;
