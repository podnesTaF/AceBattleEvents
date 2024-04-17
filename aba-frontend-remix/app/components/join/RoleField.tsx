import CheckIcon from "@mui/icons-material/Check";
import { Paper } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { JoinFormValues } from "~/lib/auth/utils/join-schema";
import { IRole } from "~/lib/types";

const RoleField = ({ role }: { role: IRole }) => {
  const { setValue, watch } = useFormContext<JoinFormValues>();
  const selectedRoles = watch("roles") || [];
  const isSelected = selectedRoles?.includes(role.id);

  const toggleSelection = () => {
    setValue(
      "roles",
      isSelected
        ? selectedRoles?.filter((r) => r !== role.id)
        : [...selectedRoles, role.id],
      { shouldValidate: true }
    );
  };
  return (
    <Paper
      elevation={isSelected ? 8 : 0}
      component="button"
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      onClick={toggleSelection}
      className={`p-3 border w-full rounded-sm flex flex-col relative transition-all duration-300 ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      } outline-none focus:ring-2 focus:ring-blue-500`}
      tabIndex={0} // Make it keyboard accessible
    >
      <div className="max-h-[250px] w-full transition-transform duration-300 flex justify-center items-end">
        <img
          src={role.image?.mediaUrl || "/images/role-placeholder.png"}
          alt={role.name}
          className="h-32 md:h-48 w-auto object-contain"
        />
      </div>
      <div className="mt-3">
        <h4 className="text-xl font-semibold mb-1 capitalize text-center">
          {role.name}
        </h4>
        <p className="text-center">{role.description}</p>
      </div>
      <div
        className={`absolute left-2 top-2 transition-all ${
          isSelected ? "visible" : "invisible"
        }`}
      >
        <CheckIcon color="success" fontSize="large" />
      </div>
    </Paper>
  );
};

export default RoleField;
