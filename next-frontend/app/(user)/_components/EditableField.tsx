"use client";

import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { formatDateToDots } from "@/common/lib/utils";
import { useState } from "react";
import { IUser } from "../_lib/types";
import ProfileItemWrapper from "./ProfileItemWrapper";

interface EditableFieldProps {
  values: string[];
  placeholder?: string;
  type?: "text" | "date";
  title: string;
  onSave?: (names: (keyof IUser)[], values: string[]) => void;
  children?: React.ReactNode;
  names: (keyof IUser)[];
  removable?: boolean;
}

const EditableField = ({
  values,
  placeholder,
  title,
  onSave,
  type = "text",
  removable,
  names,
}: EditableFieldProps): JSX.Element => {
  const [edit, setEdit] = useState(false);
  const [inputValues, setInputValues] = useState<string[]>(values);

  const updateField = () => {
    if (onSave) {
      onSave(names, inputValues);
    }
    setEdit(false);
  };

  const removeField = () => {
    if (!removable) return;

    const newValues = [...inputValues.map(() => "")];
    setInputValues((prev) => prev.map(() => ""));
    if (onSave) {
      onSave(names, newValues);
    }
  };

  return (
    <ProfileItemWrapper className="gap-3 items-center">
      <h4 className="text-gray-400 w-44">{title}</h4>
      {edit ? (
        <>
          <div className="flex-[3] flex gap-2">
            {inputValues.map((value, index) => (
              <Input
                key={index}
                type={type}
                value={value}
                onChange={(e) => {
                  const newValues = [...inputValues];
                  newValues[index] = e.target.value;
                  setInputValues(newValues);
                }}
                className="flex-1 py-2 font-semibold text-lg max-w-xs"
                placeholder={placeholder}
              />
            ))}
          </div>
          <Button size="lg" onClick={updateField} className="font-semibold">
            Save
          </Button>
        </>
      ) : inputValues.join(" ").length > 0 ? (
        <>
          <h4 className="flex-[3]">
            {type === "date"
              ? formatDateToDots(inputValues.join(" "))
              : inputValues.join(" ")}
          </h4>
          <Button
            size="lg"
            onClick={() => setEdit(true)}
            className="font-semibold"
          >
            Edit
          </Button>
          {removable && (
            <Button
              onClick={removeField}
              size="lg"
              variant={"link"}
              className="font-semibold"
            >
              Remove
            </Button>
          )}
        </>
      ) : (
        <>
          <h4 className="flex-[3]">Is not set</h4>
          <Button
            size="lg"
            onClick={() => setEdit(true)}
            className="font-semibold"
          >
            Add
          </Button>
        </>
      )}
    </ProfileItemWrapper>
  );
};

export default EditableField;
