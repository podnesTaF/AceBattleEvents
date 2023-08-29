import { Check, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

interface Props {
  type: string;
  onSubmit: Function;
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  uneditable?: boolean;
}

const EditableInput: React.FC<Props> = ({
  type,
  onSubmit,
  label,
  placeholder,
  value,
  uneditable,
  name,
}) => {
  const [newValue, setNewValue] = useState(value);
  const [isEditable, setIsEditable] = useState(false);

  const handleIconClick = () => {
    if (isEditable && onSubmit) {
      onSubmit({ [name]: newValue });
    }
    setIsEditable(!isEditable);
  };

  return (
    <div className="my-2 w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-md lg:text-lg font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="w-full flex gap-2">
        <input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          readOnly={!isEditable}
          placeholder={placeholder}
          className="bg-gray-50 border shadow-sm text-gray-900 text-sm rounded-lg focus:border-[1px] outline-none block w-full p-2.5 focus:border-blue-500/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500/500 dark:focus:border-blue-500/50"
        />
        {!uneditable && (
          <IconButton size="small" onClick={handleIconClick}>
            {isEditable ? <Check /> : <Edit />}
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default EditableInput;
