"use client";

import { Session } from "next-auth";
import EditableField from "../../_components/EditableField";
import EditableSelect from "../../_components/EditableSelect";
import ProfileItemWrapper from "../../_components/ProfileItemWrapper";
import { IUser } from "../../_lib/types";
import { updateUserField } from "../../_lib/utils";
import UserCountry from "./UserCountry";

interface ProfileInformationProps {
  session: Session;
  user: IUser;
}

const PersonalDetails = ({
  session,
  user,
}: ProfileInformationProps): JSX.Element => {
  return (
    <div className="shadow-sm border-gray-300 border-[1px]">
      <ProfileItemWrapper>
        <h3>Personal Details</h3>
      </ProfileItemWrapper>
      <EditableField
        values={[user.dateOfBirth || ""]}
        type="date"
        placeholder="Enter your date of birth"
        title="Date Of Birth"
        names={["dateOfBirth"]}
        removable={true}
        onSave={updateUserField.bind(null, session)}
      />

      <ProfileItemWrapper className="justify-between items-center gap-3">
        <h4 className="text-gray-400 w-44">Sex</h4>
        <EditableSelect
          options={[
            {
              id: 1,
              name: "male",
            },
            {
              id: 2,
              name: "female",
            },
          ]}
          name="gender"
          value={user.genderId || null}
          defaultOption={{ id: null, name: "Select sex" }}
          removable={true}
          onSave={(value) => updateUserField(session, ["genderId"], [value])}
        />
      </ProfileItemWrapper>
      <UserCountry user={user} />
      <EditableField
        values={[user.city || ""]}
        placeholder="Enter your city"
        title="City"
        names={["city"]}
        removable={true}
        onSave={updateUserField.bind(null, session)}
      />
    </div>
  );
};

export default PersonalDetails;
