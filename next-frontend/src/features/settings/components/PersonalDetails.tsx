"use client";

import { IUser, ProfileItemWrapper } from "@/src/entities/User";
import { EditableInput, EditableSelect } from "@/src/shared/ui/editable";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { updateUserField } from "../update-user-field.api";
import EditableWrapper from "./EditableWrapper";

const UserCountry = dynamic(
  () => import("../update-country/UpdateCountry.ui"),
  {
    loading: () => <p>Loading...</p>,
  }
);

interface ProfileInformationProps {
  session: Session;
  user: IUser;
}

export const PersonalDetails = ({
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
