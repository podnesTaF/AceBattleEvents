import { IUser } from "@/src/entities/User";
import { EmailNotifications } from "@/src/features/settings";
import {
  PersonalDetails,
  ProfileInformation,
} from "@/src/features/settings/components";
import { SettingProgress } from "@/src/features/settings/setting-progress";
import { Session } from "next-auth";

const UserSettings = ({
  user,
  session,
}: {
  user: IUser;
  session: Session;
}): JSX.Element => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SettingProgress user={user} />
      <ProfileInformation session={session} user={user} />

      <PersonalDetails session={session} user={user} />

      <EmailNotifications
        session={session}
        notificationEnabled={user.notificationsEnabled}
      />
    </div>
  );
};

export default UserSettings;
