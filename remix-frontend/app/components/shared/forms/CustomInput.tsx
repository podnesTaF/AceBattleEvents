import React from "react";
import InputMask from "react-input-mask";

interface FormFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  mask?: string;
}

const CustomInput: React.FC<FormFieldProps> = ({
  name,
  placeholder,
  type,
  mask,
  ...props
}) => {
  return mask ? (
    <InputMask
      {...props}
      mask={mask}
      name={name}
      type={type || "text"}
      className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
      placeholder={placeholder}
    />
  ) : (
    <input
      {...props}
      name={name}
      type={type || "text"}
      className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:border-2 outline-none border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
