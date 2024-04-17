import { useFormContext } from "react-hook-form";
import { IRole } from "~/lib/types";
import RoleField from "../RoleField";

const RolePicker = ({ roles }: { roles: IRole[] }) => {
  const { formState } = useFormContext();
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center gap-5 sm:gap-10 max-w-xl">
        {roles.map((role: IRole) => (
          <RoleField key={role.id} role={role} />
        ))}
      </div>
      {!!formState.errors["roles"]?.message && (
        <p className="mt-1 lg:mt-2 text-sm text-red-600 dark:text-red-500">
          {formState.errors["roles"]?.message as any}
        </p>
      )}
    </div>
  );
};

export default RolePicker;
