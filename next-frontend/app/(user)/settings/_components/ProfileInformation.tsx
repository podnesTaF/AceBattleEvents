"use client";

import { Button } from "@/common/components/ui/button";
import { Session } from "next-auth";
import EditableField from "../../_components/EditableField";
import ProfileItemWrapper from "../../_components/ProfileItemWrapper";
import UserAvatar from "../../_components/UserAvatar";
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
      <ProfileItemWrapper className="justify-between items-center gap-3">
        <h4 className="text-gray-400 flex-[1]">Avatar</h4>
        <div className="flex-[3] ml-7">
          <UserAvatar className="w-[58px] h-[58px]" user={user} />
        </div>
        <Button size="lg" className="font-semibold">
          Edit
        </Button>
        <Button size="lg" variant={"link"} className="font-semibold">
          Remove
        </Button>
      </ProfileItemWrapper>
      <ProfileItemWrapper className="flex-col gap-4">
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
      </ProfileItemWrapper>
      <EditableField
        values={[user.firstName, user.secondName]}
        placeholder="Enter Your Name"
        title="Full Name"
        names={["firstName", "secondName"]}
        onSave={updateUserField.bind(null, session)}
      />
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
