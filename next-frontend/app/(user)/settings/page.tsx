import { Api } from "@/api/axiosInstance";
import { auth } from "@/app/(auth)/_lib/utils/auth";
import { Progress } from "@/src/shared/ui/progress";
import dynamic from "next/dynamic";
import { calculateSettingsProgress } from "../_lib/utils/calculate-settings-progress";
import EmailNotifications from "./_components/EmailNotifications";
import ProfileInformation from "./_components/ProfileInformation";

const PersonalDetails = dynamic(() => import("./_components/PersonalDetails"), {
  loading: () => <p>Loading...</p>,
});

export default async function ProfilePage() {
  const session = await auth();
  const user = await Api(session).users.getMe();

  const progress = calculateSettingsProgress(user);

  if (!session || !user) return null;

  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <h3 className="text-2xl text-right mb-2 font-semibold">
          {progress.value.toFixed(0)} % completed
        </h3>
        <Progress value={progress.value} color="success" className="w-full" />
      </div>

      <ProfileInformation session={session} user={user} />

      <PersonalDetails session={session} user={user} />

      <EmailNotifications
        session={session}
        notificationEnabled={user.notificationsEnabled}
      />
    </div>
  );
}
