"use client";
import { Button } from "@/common/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { useState } from "react";

interface EditableSelectProps {
  options: {
    id: number;
    name: string;
  }[];
  defaultOption?: {
    id: null;
    name: string;
  };
  onSave?: (value: number | null) => void;
  value: number | null;
  removable?: boolean;
  className?: string;
  name: string;
  groupLabel?: string;
}

const EditableSelect = ({
  options,
  defaultOption,
  onSave,
  className,
  value,
  removable,
  groupLabel,
}: EditableSelectProps): JSX.Element => {
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState<string>(
    value ? value.toString() : ""
  );

  const updateField = () => {
    if (onSave) {
      const selectedNum = selected ? +selected : null;
      onSave(selectedNum);
    }
    setEdit(false);
  };

  const removeField = () => {
    if (!removable) return;

    setSelected("");
    if (onSave) {
      onSave(null);
    }

    setEdit(false);
  };

  return edit ? (
    <>
      <div className="flex-[3] flex gap-2">
        <Select value={selected} onValueChange={(value) => setSelected(value)}>
          <SelectTrigger value={""} className="max-w-xs">
            <SelectValue placeholder={defaultOption?.name || "Select option"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button size="lg" onClick={updateField} className="font-semibold">
        Save
      </Button>
    </>
  ) : selected ? (
    <>
      <h4 className="flex-[3]">
        {options.find((o) => o.id === +selected)?.name || defaultOption?.name}
      </h4>
      <Button size="lg" onClick={() => setEdit(true)} className="font-semibold">
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
      <h4 className="flex-[3]">Not selected</h4>
      <Button size="lg" onClick={() => setEdit(true)} className="font-semibold">
        Add
      </Button>
    </>
  );
};

export default EditableSelect;
