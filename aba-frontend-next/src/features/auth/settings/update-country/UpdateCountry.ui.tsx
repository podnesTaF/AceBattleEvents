import { IUser } from "@/src/entities/User";
import { EditableSelect } from "@/src/shared/ui/editable";
import EditableWrapper from "../components/EditableWrapper";
import { useUpdateCountry } from "./useUpdateCountry.hook";

const UserCountry = ({ user }: { user: IUser }) => {
  const { countries, onSave } = useUpdateCountry();

  return (
    <EditableWrapper
      title="Country"
      values={[user.countryId || null]}
      names={["countryId"]}
      onSave={onSave}
      removable={true}
    >
      {countries ? (
        <EditableSelect
          options={countries}
          name="country"
          defaultOption={{ id: null, name: "Select a country" }}
          groupLabel="Country"
        />
      ) : (
        <h4 className="text-gray-400  flex-[3]">Loading...</h4>
      )}
    </EditableWrapper>
  );
};

export default UserCountry;
