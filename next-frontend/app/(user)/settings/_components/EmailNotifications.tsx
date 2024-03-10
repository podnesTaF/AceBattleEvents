"use client";
import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import { Session } from "next-auth";
import { useState } from "react";
import ProfileItemWrapper from "../../_components/ProfileItemWrapper";
import { updateUserField } from "../../_lib/utils";

interface EmailNotificationsProps {
  session: Session;
  notificationEnabled?: boolean;
}

const EmailNotifications = ({
  session,
  notificationEnabled,
}: EmailNotificationsProps): JSX.Element => {
  const [emailNotifications, setEmailNotifications] =
    useState(notificationEnabled);

  const [isLoading, setIsLoading] = useState(false);

  const onChange = async (checked: boolean) => {
    setEmailNotifications(checked);
    setIsLoading(true);
    await updateUserField(session, ["notificationsEnabled"], [checked]);
    setIsLoading(false);
  };
  return (
    <div className="border-gray-300 border-[1px] shadow-sm">
      <ProfileItemWrapper>
        <h3>Email Notifications</h3>
      </ProfileItemWrapper>
      <ProfileItemWrapper className="flex-col gap-4">
        <div className="flex justify-between mb-4 gap-5">
          <Label htmlFor="notificationsEnabled">
            {" "}
            <h4 className="text-gray-400">Enable email notifications</h4>
          </Label>

          <Switch
            disabled={isLoading}
            id="notificationsEnabled"
            onCheckedChange={onChange}
            checked={emailNotifications}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <h5 className="text-gray-400">
            We will send you notifications about upcoming events, news and
            general information
          </h5>
        </div>
      </ProfileItemWrapper>
    </div>
  );
};

export default EmailNotifications;
