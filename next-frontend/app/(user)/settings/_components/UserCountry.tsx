"use client";
import { Api } from "@/api/axiosInstance";
import EditableWrapper from "@/common/components/editable/EditableWrapper";
import { useGetCountryNamesQuery } from "@/lib/features/countries/CountryService";
import { useSession } from "next-auth/react";
import EditableSelect from "../../../../common/components/editable/EditableSelect";
import { IUser } from "../../_lib/types";

const UserCountry = ({ user }: { user: IUser }) => {
  const { data: countries, isLoading, error } = useGetCountryNamesQuery();
  const { data: session } = useSession();

  const onSave = async (names: (keyof IUser)[], values: string[]) => {
    const payload = {
      [names[0]]: values[0],
    };

    await Api(session).users.updateMyProfile(payload);
  };
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
