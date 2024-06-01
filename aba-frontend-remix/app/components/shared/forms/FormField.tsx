import React from "react";
import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

interface FormFieldProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  mask?: string;
  autoGenerate?: boolean;
  lines?: number;
  icon?: React.ReactNode;
  remark?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type,
  mask,
  lines,
  icon,
  autoGenerate,
  remark,
  ...props
}) => {
  const { register, formState, setValue } = useFormContext();

  const generatePass = () => {
    const pass = Math.random().toString(36).slice(-8);
    setValue(name, pass);
  };

  return (
    <div className="my-2" {...props}>
      <label htmlFor={name} className="block mb-2 ml-3">
        <div className="flex gap-2 items-center">
          {icon}
          <p className="text-sm lg:text-md xl:text-lg font-semibold text-[#333]">
            {label}
          </p>
        </div>
      </label>
      {mask ? (
        <InputMask
          id={name}
          mask={mask}
          type={type || "text"}
          {...register(name)}
          className="bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-full focus:border-2 outline-none block w-full p-2.5 lg:p-4 dark:bg-gray-700 focus:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-blue-500/50"
          placeholder={placeholder}
        />
      ) : (
        <div className="w-full flex items-center gap-3">
          {lines ? (
            <textarea
              id={name}
              className="flex-1 bg-gray-50 border shadow-sm text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-2 focus:ring-gray-600/70 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-blue-500/50"
              placeholder={placeholder}
              {...register(name)}
              rows={lines}
            ></textarea>
          ) : (
            <input
              id={name}
              autoComplete="on"
              type={type || "text"}
              {...register(name)}
              className="flex-1 bg-gray-50 border text-gray-900 text-sm lg:text-md 2xl:text-lg rounded-full focus:ring-2 focus:ring-gray-600/70  outline-none block w-full p-2.5 lg:p-4 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:rind-gray-500 dark:focus:border-gray-500"
              placeholder={placeholder}
            />
          )}
          {autoGenerate && (
            <button
              type={"button"}
              onClick={() => generatePass()}
              className="p-2 rounded bg-blue-400 font-semibold text-white"
            >
              Auto Generate
            </button>
          )}
        </div>
      )}
      {remark && (
        <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 mt-1 ml-3">
          {remark}
        </p>
      )}
      {!!formState.errors[name]?.message && (
        <p className="mt-1 lg:mt-2 text-sm text-red-600 dark:text-red-500">
          {formState.errors[name]?.message as any}
        </p>
      )}
    </div>
  );
};

export default FormField;
