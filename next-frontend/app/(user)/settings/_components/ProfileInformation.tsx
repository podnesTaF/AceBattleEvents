"use client";

import EditableAvatar from "@/common/components/editable/EditableImageField";
import { Button } from "@/src/shared/ui/button";
import { Session } from "next-auth";
import EditableInput from "../../../../common/components/editable/EditableInput";
import EditableWrapper from "../../../../common/components/editable/EditableWrapper";
import ProfileItemWrapper from "../../_components/ProfileItemWrapper";
import { IUser } from "../../_lib/types";
import { updateUserField } from "../../_lib/utils";

interface ProfileInformationProps {
  session: Session;
  user: IUser;
}

const ProfileInformation = ({
  session,
  user,
}: ProfileInformationProps): JSX.Element => {
  return (
    <div className="border-gray-300 border-[1px] shadow-sm">
      <ProfileItemWrapper>
        <h3>Profile Information</h3>
      </ProfileItemWrapper>
      <EditableAvatar
        name="avatar"
        title="Avatar"
        user={user}
        onSave={updateUserField.bind(null, session)}
      />
      <EditableAvatar
        name="image"
        title="Image"
        user={user}
        onSave={updateUserField.bind(null, session)}
      />
      {/* <ProfileItemWrapper className="flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="text-gray-400">Image</h4>
          <div className="flex gap-2">
            <Button size="lg" className="font-semibold">
              Edit
            </Button>
            <Button size="lg" variant={"link"} className="font-semibold">
              Remove
            </Button>
          </div>
        </div>
        <div className="flex flex-1 gap-3 md:gap-6 items-end">
          <div className="max-w-[220px] text-gray-400">
            <p>
              *It will make easier to reach you on the actual competition.
              Please provide your real photo
            </p>
          </div>
          <div className="border-[5px] border-gray-400 hover:border-gray-300 border-dashed h-44 flex-1 flex justify-center items-center">
            <h4 className="text-gray-400 hover:text-gray-300 text-center select-none">
              Drag and drop a photo or <br />
              <span className="text-black hover:underline">Select a file</span>
            </h4>
          </div>
        </div>
      </ProfileItemWrapper> */}
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

export default ProfileInformation;
