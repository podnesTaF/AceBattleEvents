"use client";

import { IUser, ProfileItemWrapper } from "@/src/entities/User";
import { Button } from "@/src/shared/ui/button";
import { EditableInput } from "@/src/shared/ui/editable";
import { Session } from "next-auth";
import { updateUserField } from "../update-user-field.api";
import { EditableImageField } from "./EditableImageField";
import EditableWrapper from "./EditableWrapper";

interface ProfileInformationProps {
  session: Session;
  user: IUser;
}

export const ProfileInformation = ({
  session,
  user,
}: ProfileInformationProps): JSX.Element => {
  return (
    <div className="border-gray-300 border-[1px] shadow-sm">
      <ProfileItemWrapper>
        <h3>Profile Information</h3>
      </ProfileItemWrapper>
      <EditableImageField
        name="avatar"
        title="Avatar"
        user={user}
        onSave={updateUserField.bind(null, session)}
      />
      <EditableImageField
        name="image"
        title="Image"
        user={user}
        onSave={updateUserField.bind(null, session)}
      />
      <EditableWrapper
        values={[user.firstName, user.lastName]}
        title="Full Name"
        names={["firstName", "lastName"]}
        onSave={updateUserField.bind(null, session)}
      >
        <EditableInput placeholder="enter your name" />
      </EditableWrapper>

      <ProfileItemWrapper className="gap-3 items-center">
        <h4 className="text-gray-400 w-44">Email</h4>
        <h4 className="flex-[3] text-gray-400">{user.email}</h4>
      </ProfileItemWrapper>
      <ProfileItemWrapper className="gap-3 items-center">
        <h4 className="text-gray-400 w-44">Password</h4>
        <h4 className="flex-[3] text-gray-400">***********</h4>
        <Button size="lg" className="font-semibold">
          Change password
        </Button>
      </ProfileItemWrapper>
    </div>
  );
};
