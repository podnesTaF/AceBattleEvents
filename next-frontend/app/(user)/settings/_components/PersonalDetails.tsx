"use client";

import { Session } from "next-auth";
import dynamic from "next/dynamic";
import EditableInput from "../../../../common/components/editable/EditableInput";
import EditableSelect from "../../../../common/components/editable/EditableSelect";
import { default as EditableWrapper } from "../../../../common/components/editable/EditableWrapper";
import ProfileItemWrapper from "../../_components/ProfileItemWrapper";
import { IUser } from "../../_lib/types";
import { updateUserField } from "../../_lib/utils";

const UserCountry = dynamic(() => import("./UserCountry"), {
  loading: () => <p>Loading...</p>,
});

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
      <EditableWrapper
        values={[user.dateOfBirth || ""]}
        title="Date Of Birth"
        names={["dateOfBirth"]}
        removable={true}
        onSave={updateUserField.bind(null, session)}
      >
        <EditableInput type="date" placeholder="Enter your date of birth" />
      </EditableWrapper>

      <EditableWrapper
        values={[user.genderId || null]}
        title="Sex"
        names={["genderId"]}
        onSave={updateUserField.bind(null, session)}
        removable={true}
      >
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
          name={"genderId"}
          defaultOption={{ id: null, name: "Select sex" }}
        />
      </EditableWrapper>
      <UserCountry user={user} />
      <EditableWrapper
        values={[user.city || ""]}
        title="City"
        names={["city"]}
        removable={true}
        onSave={updateUserField.bind(null, session)}
      >
        <EditableInput placeholder="Enter your city" />
      </EditableWrapper>
    </div>
  );
};

export default PersonalDetails;
