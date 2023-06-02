import React from "react";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type,
}) => {
  const { register, formState } = useFormContext();
  return (
    <div className="my-2">
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        {...register(name)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
      {!!formState.errors[name]?.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {formState.errors[name]?.message as any}
        </p>
      )}
    </div>
  );
};

export default FormField;
