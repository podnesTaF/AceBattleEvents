"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui/select";
import { useEditableContext } from "../../lib";

interface EditableSelectProps {
  options: {
    id: number;
    name: string;
  }[];
  defaultOption?: {
    id: null;
    name: string;
  };
  name: string;
  groupLabel?: string;
}

export const EditableSelect = ({
  options,
  defaultOption,
  groupLabel,
}: EditableSelectProps): JSX.Element => {
  const { edit, values, onChange } = useEditableContext();

  return edit ? (
    <>
      <div className="flex-[3] flex gap-2">
        <Select value={values[0]} onValueChange={(value) => onChange([value])}>
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
    </>
  ) : values[0] ? (
    <>
      <h4 className="flex-[3]">
        {options.find((o) => o.id === +values[0])?.name || defaultOption?.name}
      </h4>
    </>
  ) : (
    <>
      <h4 className="flex-[3]">Not selected</h4>
    </>
  );
};
