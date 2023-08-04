import React from "react";

interface GrayedInputProps {
  name: string;
  value?: string;
  label: string;
}

const GrayedInput: React.FC<GrayedInputProps> = ({ name, value, label }) => {
  return (
    <div className="my-2">
      <label
        htmlFor={name}
        className="block mb-2 text-lg lg:text-xl font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        value={value}
        className="border-[1px] rounded-lg border-gray-400 bg-gray-200 w-full p-2.5 text-gray-400 text-sm"
        disabled
      />
    </div>
  );
};

export default GrayedInput;
