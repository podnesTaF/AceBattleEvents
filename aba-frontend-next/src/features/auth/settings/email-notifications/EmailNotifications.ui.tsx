"use client";

import { ProfileItemWrapper } from "@/src/entities/User";
import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import { Session } from "next-auth";
import { useEmailNotifications } from "./useEmailNotifications";

interface EmailNotificationsProps {
  session: Session;
  notificationEnabled?: boolean;
}

export const EmailNotifications = ({
  session,
  notificationEnabled,
}: EmailNotificationsProps): JSX.Element => {
  const { emailNotifications, isLoading, toggleEmailNotifications } =
    useEmailNotifications(session, notificationEnabled);

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
            onCheckedChange={toggleEmailNotifications}
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
