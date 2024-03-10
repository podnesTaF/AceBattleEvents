"use client";

import ProfileItemWrapper from "@/app/(user)/_components/ProfileItemWrapper";
import { IUser } from "@/app/(user)/_lib/types";
import { Button } from "@/src/shared/ui/button";
import React, { useState } from "react";
import { EditableProvider } from "./EditableProvider";

interface EditableWrapperProps {
  children: React.ReactElement;
  values: (string | number | null)[];
  title: string;
  onSave?: (names: (keyof IUser)[], values: string[]) => void;
  names: (keyof IUser)[];
  removable?: boolean;
}

const EditableWrapper = ({
  values,
  title,
  onSave,
  removable,
  children,
  names,
}: EditableWrapperProps): JSX.Element => {
  const [edit, setEdit] = useState(false);
  const [inputValues, setInputValues] = useState<string[]>(
    values.map((v) => (v ? v.toString() : ""))
  );

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
      <EditableProvider
        edit={edit}
        values={inputValues}
        onChange={setInputValues}
      >
        {children}
      </EditableProvider>
      {edit ? (
        <Button size="lg" onClick={updateField} className="font-semibold">
          Save
        </Button>
      ) : inputValues.join(" ").length > 0 ? (
        <>
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
        <Button
          size="lg"
          onClick={() => setEdit(true)}
          className="font-semibold"
        >
          Add
        </Button>
      )}
    </ProfileItemWrapper>
  );
};

export default EditableWrapper;
