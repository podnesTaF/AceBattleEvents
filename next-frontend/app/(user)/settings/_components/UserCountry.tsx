"use client";
import { Api } from "@/api/axiosInstance";
import { useGetCountryNamesQuery } from "@/lib/features/countries/CountryService";
import { useSession } from "next-auth/react";
import EditableSelect from "../../_components/EditableSelect";
import ProfileItemWrapper from "../../_components/ProfileItemWrapper";
import { IUser } from "../../_lib/types";

const UserCountry = ({ user }: { user: IUser }) => {
  const { data: countries, isLoading, error } = useGetCountryNamesQuery();
  const { data: session } = useSession();

  const onSave = async (value: number | null) => {
    const payload = {
      countryId: value,
    };

    await Api(session).users.updateMyProfile(payload);
  };
  return (
    <ProfileItemWrapper className="justify-between items-center gap-3">
      <h4 className="text-gray-400  w-44">Country</h4>
      {countries ? (
        <EditableSelect
          options={countries}
          name="country"
          value={user.countryId || null}
          onSave={onSave}
          defaultOption={{ id: null, name: "Select a country" }}
          groupLabel="Country"
          removable={true}
        />
      ) : (
        <h4 className="text-gray-400  flex-[3]">Loading...</h4>
      )}
    </ProfileItemWrapper>
  );
};

export default UserCountry;
