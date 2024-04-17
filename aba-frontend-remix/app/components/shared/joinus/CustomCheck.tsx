import { Checkbox, FormControlLabel } from "@mui/material";
import { green } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";

interface CustomCheckProps {
  name: string;
  label: string;
}

const CustomCheck: React.FC<CustomCheckProps> = ({ name, label }) => {
  const { register, getValues, formState } = useFormContext();
  return (
    <div>
      <FormControlLabel
        {...register(name)}
        control={
          <Checkbox
            sx={{
              color: green[800],
              "&.Mui-checked": {
                color: green[600],
              },
            }}
          />
        }
        label={label}
      />
      {!!formState.errors[name]?.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {formState.errors[name]?.message as any}
        </p>
      )}
    </div>
  );
};

export default CustomCheck;
