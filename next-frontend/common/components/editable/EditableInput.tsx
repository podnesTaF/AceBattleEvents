import { formatDateToDots } from "@/common/lib/utils";
import { Input } from "@/src/shared/ui/input";
import { useEditableContext } from "./EditableProvider";

interface EditableInputProps {
  type?: "text" | "date";
  placeholder?: string;
}

const EditableInput = ({
  type = "text",
  placeholder,
}: EditableInputProps): JSX.Element => {
  const { edit, values, onChange } = useEditableContext();
  return (
    <div className="flex-[3] flex gap-2">
      {edit ? (
        values.map((value, index) => (
          <Input
            key={index}
            type={type}
            value={value}
            onChange={(e) => {
              const newValues = [...values];
              newValues[index] = e.target.value;
              onChange(newValues);
            }}
            className="flex-1 py-2 font-semibold text-lg max-w-xs"
            placeholder={placeholder}
          />
        ))
      ) : values.join(" ").length > 0 ? (
        <h4 className="flex-[3]">
          {type === "date"
            ? formatDateToDots(values.join(" "))
            : values.join(" ")}
        </h4>
      ) : (
        <h4 className="flex-[3]">Is not set</h4>
      )}
    </div>
  );
};

export default EditableInput;
